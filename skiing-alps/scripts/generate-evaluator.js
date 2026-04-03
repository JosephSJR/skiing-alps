#!/usr/bin/env node
/**
 * Skiing Alps Evaluator JSON Generator
 *
 * Generates evaluator JSONs using the correct OSWorld array-based postconfig format.
 * See references/osworld-evaluator-structure.md for the specification.
 *
 * Usage:
 *   node generate-evaluator.js --filename report --ext docx --func compare_docx_files \
 *     --win-cds "scale-cds://..." --ubu-cds "scale-cds://..." --mac-cds "scale-cds://..." \
 *     --options '{"examine_text":true,"ignore_blanks":false}'
 */

const args = process.argv.slice(2);

function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : null;
}

const filename = getArg('filename') || 'output';
const ext = getArg('ext') || 'docx';
const func = getArg('func') || 'compare_docx_files';
const winCds = getArg('win-cds');
const ubuCds = getArg('ubu-cds');
const macCds = getArg('mac-cds');
const options = JSON.parse(getArg('options') || '{"examine_text":true}');
const taskInit = getArg('task-init') || 'chrome-office';

// App name mapping
const appNames = {
  docx: { ubuntu: 'LibreOffice Writer', windows: 'Word', mac: 'Microsoft Word' },
  pptx: { ubuntu: 'LibreOffice Impress', windows: 'PowerPoint', mac: 'Microsoft PowerPoint' },
  xlsx: { ubuntu: 'LibreOffice Calc', windows: 'Excel', mac: 'Microsoft Excel' }
};

const app = appNames[ext] || appNames.docx;

// Window name patterns per OS
const windowNames = {
  ubuntu: `${filename}.${ext} - ${app.ubuntu}`,
  windows: `${filename} - ${app.windows}`,
  mac: `${filename}.${ext}`
};

// VM file paths per OS
const vmPaths = {
  ubuntu: `/home/user/Desktop/${filename}.${ext}`,
  windows: `C:\\Users\\User\\Desktop\\${filename}.${ext}`,
  mac: `/Users/user/Desktop/${filename}.${ext}`
};

// Build array-based postconfig for a given OS
function buildPostconfig(os) {
  const windowName = windowNames[os];

  const postconfig = [
    {
      type: 'activate_window',
      parameters: {
        window_name: windowName,
        strict: true
      }
    },
    {
      type: 'sleep',
      parameters: {
        seconds: 0.5
      }
    },
    {
      type: 'execute',
      parameters: {
        command: os === 'mac'
          ? ['osascript', '-e', `tell application "${app.mac}" to activate`]
          : ['python', '-c', "import pyautogui; pyautogui.hotkey('ctrl', 's');"]
      }
    },
    {
      type: 'sleep',
      parameters: {
        seconds: 0.5
      }
    }
  ];

  // macOS uses Cmd+S via osascript, so add a separate save step
  if (os === 'mac') {
    postconfig[2] = {
      type: 'execute',
      parameters: {
        command: [
          'osascript', '-e',
          `tell application "System Events" to keystroke "s" using command down`
        ]
      }
    };
  }

  return postconfig;
}

// Generate evaluator for any OS
function generateEvaluator(os, cdsUrl) {
  if (!cdsUrl) return null;

  return {
    func: func,
    expected: {
      type: 'cloud_file',
      path: cdsUrl,
      dest: `${filename}_Gold.${ext}`
    },
    result: {
      type: 'vm_file',
      path: vmPaths[os],
      dest: `${filename}.${ext}`
    },
    options: options,
    postconfig: buildPostconfig(os)
  };
}

console.log('=== WINDOWS EVALUATOR ===');
if (winCds) {
  console.log(JSON.stringify(generateEvaluator('windows', winCds), null, 2));
} else {
  console.log('(no Windows CDS URL provided)');
}

console.log('\n=== UBUNTU EVALUATOR ===');
if (ubuCds) {
  console.log(JSON.stringify(generateEvaluator('ubuntu', ubuCds), null, 2));
} else {
  console.log('(no Ubuntu CDS URL provided)');
}

console.log('\n=== macOS EVALUATOR ===');
if (macCds) {
  console.log(JSON.stringify(generateEvaluator('mac', macCds), null, 2));
} else {
  console.log('(no macOS CDS URL provided)');
}

console.log('\n=== TASK INITIALIZER ===');
console.log(`Task Project Name: ${taskInit}`);

console.log('\n=== CROSS-OS SUMMARY ===');
console.log(`File: ${filename}.${ext}`);
console.log(`Ubuntu path:  ${vmPaths.ubuntu}`);
console.log(`Windows path: ${vmPaths.windows}`);
console.log(`macOS path:   ${vmPaths.mac}`);
console.log(`Ubuntu window:  ${windowNames.ubuntu}`);
console.log(`Windows window: ${windowNames.windows}`);
console.log(`macOS window:   ${windowNames.mac}`);
