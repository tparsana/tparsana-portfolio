interface JokeCommand {
  type: 'joke';
  jokes: string[];
}

interface AsciiCommand {
  type: 'ascii';
  execute: (text: string) => string;
}

interface MatrixCommand {
  type: 'matrix';
  description: string;
  duration?: number;
}

interface SurpriseCommand {
  type: 'surprise';
  url: string;
}

interface MusicTrack {
  name: string;
  url: string;
}

interface MusicCommand {
  type: 'music';
  tracks: MusicTrack[];
  isPlaying?: boolean;
}

type Command = 
  | JokeCommand 
  | AsciiCommand 
  | MatrixCommand 
  | SurpriseCommand 
  | MusicCommand;

// Audio element for music playback
let audioElement: HTMLAudioElement | null = null;

const terminalCommands: Record<string, Command> = {
  joke: {
    type: 'joke',
    jokes: [
      "Why do programmers prefer dark mode? Because light attracts bugs!",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
      "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
      "Why do Java developers wear glasses? Because they don't C#!",
      "How do you comfort a JavaScript bug? You console it!",
      "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
      "Why did the developer go broke? Because he used up all his cache!",
      "What's a programmer's favorite hangout place? The Foo Bar!",
      "Why don't programmers like nature? It has too many bugs and no debugging tool."
    ]
  },
  ascii: {
    type: 'ascii',
    execute: (text: string) => {
      if (!text) return "Please provide text to convert!";
      
      const funAscii: Record<string, string> = {
        'happy': `
   .--.  .--.
  ( (\\) ( \\/ )
   ) )    ) )
  ( (    ( (
   '-'    '-'
  `,
        'cool': `
   _____
  / o o \\
 |   >   |
  \\_---_/
    | |
    `,
        'cat': `
  /\\_/\\
 ( o.o )
  > ^ <
    `,
        'dog': `
   / \\__
  (    @\\___
  /         O
 /   (_____/
/_____/   U
    `,
        'robot': `
  .|||||.
 | o   o |
(|  <->  |)
 |  \\_/  |
  \\_____/
    `,
        'ghost': `
   .-.
  .'   '.
 :       :
 :       :
  '.___.'
    `,
        'rocket': `
    /\\
   /  \\
  |    |
  |____|
 /      \\
/        \\
|   __   |
|  |__|  |
||      ||
||      ||
||\\_/\\_/||
|/      \\|
    `,
        'heart': `
  .:::.   .::.
 :::::::.::::
 :::::::::::
 ':::::::::'
   ':::::'
     ':'
    `
      };
      
      if (funAscii[text.toLowerCase()]) {
        return funAscii[text.toLowerCase()];
      }
      
      const textLines = [
        '╔═╗┌─┐┌─┐┬┬  ╔═╗┬─┐┌┬┐',
        '╠═╣└─┐│  ││  ╠═╣├┬┘ │ ',
        '╩ ╩└─┘└─┘┴┴─┘╩ ╩┴└─ ┴ '
      ];
      
      const borderTop = '┌' + '─'.repeat(text.length + 2) + '┐';
      const borderBottom = '└' + '─'.repeat(text.length + 2) + '┘';
      const content = `│ ${text} │`;
      
      const fullArt = [borderTop, content, borderBottom].join('\n');
      
      return `
${textLines.join('\n')}

${fullArt}
`;
    }
  },
  matrix: {
    type: 'matrix',
    description: "Activates a Matrix-like screen effect",
    duration: 8000 // milliseconds
  },
  "surprise me": {
    type: 'surprise',
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  music: {
    type: 'music',
    tracks: [
      { name: "Chill Lofi Beat", url: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3" },
      { name: "Synthwave Cruisin'", url: "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3" },
      { name: "Coding Focus", url: "https://assets.mixkit.co/music/preview/mixkit-a-very-happy-christmas-897.mp3" }
    ],
    isPlaying: false
  }
};

// Get a random joke from the joke command
export const getRandomJoke = (): string => {
  const jokeCommand = terminalCommands.joke as JokeCommand;
  const randomIndex = Math.floor(Math.random() * jokeCommand.jokes.length);
  return jokeCommand.jokes[randomIndex];
};

// Execute the ASCII art command
export const generateAsciiArt = (text: string): string => {
  const asciiCommand = terminalCommands.ascii as AsciiCommand;
  return asciiCommand.execute(text);
};

// Execute the matrix effect
export const triggerMatrixEffect = (callback: () => void): void => {
  const matrixCommand = terminalCommands.matrix as MatrixCommand;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    callback();
    return;
  }
  
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '10000';
  document.body.appendChild(canvas);
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  
  const drops: number[] = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }
  
  const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0F0';
    ctx.font = `${fontSize}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      drops[i]++;
    }
  };
  
  let animationId: number;
  const animate = () => {
    draw();
    animationId = requestAnimationFrame(animate);
  };
  
  animate();
  
  setTimeout(() => {
    cancelAnimationFrame(animationId);
    document.body.removeChild(canvas);
    callback();
  }, matrixCommand.duration || 8000);
};

// Open the surprise video
export const openSurprise = (): void => {
  const surpriseCommand = terminalCommands["surprise me"] as SurpriseCommand;
  window.open(surpriseCommand.url, '_blank');
};

// Toggle music playback
export const toggleMusic = (trackIndex: number = 0): boolean => {
  const musicCommand = terminalCommands.music as MusicCommand;
  
  if (!audioElement) {
    audioElement = new Audio();
    
    audioElement.addEventListener('error', (e) => {
      console.error("Audio error:", e);
      musicCommand.isPlaying = false;
    });
    
    audioElement.addEventListener('playing', () => {
      console.log("Audio is now playing");
      musicCommand.isPlaying = true;
    });
    
    audioElement.addEventListener('pause', () => {
      console.log("Audio is now paused");
      musicCommand.isPlaying = false;
    });
  }
  
  if (musicCommand.isPlaying) {
    audioElement.pause();
    audioElement.currentTime = 0;
    musicCommand.isPlaying = false;
  } else {
    if (trackIndex < musicCommand.tracks.length) {
      const track = musicCommand.tracks[trackIndex];
      audioElement.src = track.url;
      audioElement.volume = 0.7;
      audioElement.loop = true;
      
      audioElement.play().catch(err => {
        console.error("Error playing audio:", err);
        alert("Unable to play audio. Please interact with the page first.");
        musicCommand.isPlaying = false;
      });
      
      musicCommand.isPlaying = true;
    }
  }
  
  return musicCommand.isPlaying;
};

// Get all available tracks
export const getMusicTracks = (): MusicTrack[] => {
  const musicCommand = terminalCommands.music as MusicCommand;
  return musicCommand.tracks;
};

// Get the list of all available commands
export const getAvailableCommands = (): string[] => {
  return Object.keys(terminalCommands);
};

// Get command help text
export const getCommandHelp = (): Record<string, string> => {
  return {
    joke: "joke - Displays a random programming joke",
    ascii: "ascii [text] - Converts text to ASCII art. Try: ascii cat, ascii dog, ascii robot, ascii happy, ascii cool, ascii heart",
    matrix: "matrix - Activates a Matrix-like screen effect",
    "surprise me": "surprise me - Opens a fun surprise",
    music: "music - Plays background music (toggle with music again)",
    help: "help - Show this help message",
    clear: "clear - Clear the terminal",
    email: "email - Start composing an email",
    submit: "submit - Submit the form",
    about: "about - Show information about this terminal",
    theme: "theme [dark|light|matrix|retro] - Change terminal theme",
    echo: "echo [text] - Echo text",
    date: "date - Display current date and time",
    whoami: "whoami - Display visitor info",
    ls: "ls - List available sections",
    open: "open [section] - Navigate to a section",
    contact: "contact - Show contact info"
  };
};

export default terminalCommands;
