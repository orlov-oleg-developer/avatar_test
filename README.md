# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


```
type BroadcastMessage =
  | { type: 'who-is-leader' }
  | { type: 'i-am-leader' }
  | { type: 'leader-left' };

class VoiceLeaderManager {
  private bc: BroadcastChannel;
  private isLeader = false;
  private recordingIntervalId: number | null = null;

  constructor(channelName = 'voice-recording') {
    this.bc = new BroadcastChannel(channelName);

    this.bc.onmessage = (event) => this.handleMessage(event.data as BroadcastMessage);
    window.addEventListener('beforeunload', () => this.cleanup());

    // Пытаемся стать лидером
    this.bc.postMessage({ type: 'who-is-leader' });
  }

  private handleMessage(message: BroadcastMessage) {
    switch (message.type) {
      case 'who-is-leader':
        if (this.isLeader) {
          this.bc.postMessage({ type: 'i-am-leader' });
        }
        break;

      case 'i-am-leader':
        this.isLeader = false;
        this.stopRecording();
        break;

      case 'leader-left':
        this.tryToBecomeLeader();
        break;
    }
  }

  private tryToBecomeLeader() {
    if (document.visibilityState !== 'visible') return; // Не становимся лидером в фоне

    if (!this.isLeader) {
      this.isLeader = true;
      this.bc.postMessage({ type: 'i-am-leader' });
      this.startRecording();
    }
  }

  private startRecording() {
    console.log('[Leader] Начало записи...');
    // Здесь можно внедрить MediaRecorder и отправку текста

    this.recordingIntervalId = window.setInterval(() => {
      this.sendTranscriptChunk(); // имитация отправки текста
    }, 4000);
  }

  private stopRecording() {
    if (this.recordingIntervalId !== null) {
      clearInterval(this.recordingIntervalId);
      this.recordingIntervalId = null;
      console.log('[Leader] Остановка записи.');
    }
  }

  private sendTranscriptChunk() {
    const dummyText = 'распознанный текст';
    console.log(`[Leader] Отправка текста: "${dummyText}"`);
    // Здесь отправка текста на сервер
  }

  private cleanup() {
    if (this.isLeader) {
      this.bc.postMessage({ type: 'leader-left' });
    }
    this.bc.close();
  }
}

export default VoiceLeaderManager;

```
