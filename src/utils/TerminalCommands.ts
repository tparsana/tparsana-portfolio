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
      // Better ASCII art conversion
      if (!text) return "Please provide text to convert!";
      
      const letters: Record<string, string[]> = {
        A: [' AAA ', 'A   A', 'AAAAA', 'A   A', 'A   A'],
        B: ['BBBB ', 'B   B', 'BBBB ', 'B   B', 'BBBB '],
        C: [' CCC ', 'C   C', 'C    ', 'C   C', ' CCC '],
        D: ['DDDD ', 'D   D', 'D   D', 'D   D', 'DDDD '],
        E: ['EEEEE', 'E    ', 'EEE  ', 'E    ', 'EEEEE'],
        F: ['FFFFF', 'F    ', 'FFF  ', 'F    ', 'F    '],
        G: [' GGG ', 'G    ', 'G  GG', 'G   G', ' GGG '],
        H: ['H   H', 'H   H', 'HHHHH', 'H   H', 'H   H'],
        I: ['IIIII', '  I  ', '  I  ', '  I  ', 'IIIII'],
        J: ['JJJJJ', '    J', '    J', 'J   J', ' JJJ '],
        K: ['K   K', 'K  K ', 'KKK  ', 'K  K ', 'K   K'],
        L: ['L    ', 'L    ', 'L    ', 'L    ', 'LLLLL'],
        M: ['M   M', 'MM MM', 'M M M', 'M   M', 'M   M'],
        N: ['N   N', 'NN  N', 'N N N', 'N  NN', 'N   N'],
        O: [' OOO ', 'O   O', 'O   O', 'O   O', ' OOO '],
        P: ['PPPP ', 'P   P', 'PPPP ', 'P    ', 'P    '],
        Q: [' QQQ ', 'Q   Q', 'Q   Q', 'Q  QQ', ' QQQQ'],
        R: ['RRRR ', 'R   R', 'RRRR ', 'R  R ', 'R   R'],
        S: [' SSS ', 'S    ', ' SSS ', '    S', ' SSS '],
        T: ['TTTTT', '  T  ', '  T  ', '  T  ', '  T  '],
        U: ['U   U', 'U   U', 'U   U', 'U   U', ' UUU '],
        V: ['V   V', 'V   V', 'V   V', ' V V ', '  V  '],
        W: ['W   W', 'W   W', 'W W W', 'WW WW', 'W   W'],
        X: ['X   X', ' X X ', '  X  ', ' X X ', 'X   X'],
        Y: ['Y   Y', ' Y Y ', '  Y  ', '  Y  ', '  Y  '],
        Z: ['ZZZZZ', '   Z ', '  Z  ', ' Z   ', 'ZZZZZ'],
        '0': [' 000 ', '0  00', '0 0 0', '00  0', ' 000 '],
        '1': ['  1  ', ' 11  ', '  1  ', '  1  ', '11111'],
        '2': [' 222 ', '2   2', '   2 ', '  2  ', '22222'],
        '3': ['3333 ', '    3', ' 333 ', '    3', '3333 '],
        '4': ['   4 ', '  44 ', ' 4 4 ', '44444', '   4 '],
        '5': ['55555', '5    ', '5555 ', '    5', '5555 '],
        '6': [' 666 ', '6    ', '6666 ', '6   6', ' 666 '],
        '7': ['77777', '   7 ', '  7  ', ' 7   ', '7    '],
        '8': [' 888 ', '8   8', ' 888 ', '8   8', ' 888 '],
        '9': [' 999 ', '9   9', ' 9999', '    9', ' 999 '],
        ' ': ['     ', '     ', '     ', '     ', '     '],
        '!': ['  !  ', '  !  ', '  !  ', '     ', '  !  '],
        '.': ['     ', '     ', '     ', '     ', '  .  '],
        ',': ['     ', '     ', '     ', '  ,  ', ' ,   '],
        '?': [' ??? ', '?   ?', '   ? ', '     ', '  ?  '],
        ':': ['     ', '  :  ', '     ', '  :  ', '     '],
        ';': ['     ', '  ;  ', '     ', '  ;  ', ' ;   '],
        '-': ['     ', '     ', '-----', '     ', '     '],
        '_': ['     ', '     ', '     ', '     ', '_____'],
        '+': ['     ', '  +  ', '+++++', '  +  ', '     '],
        '=': ['     ', '=====', '     ', '=====', '     '],
        '/': ['    /', '   / ', '  /  ', ' /   ', '/    '],
        '\\': ['\\    ', ' \\   ', '  \\  ', '   \\ ', '    \\'],
        '(': ['  (  ', ' (   ', '(    ', ' (   ', '  (  '],
        ')': ['  )  ', '   ) ', '    )', '   ) ', '  )  '],
        '[': ['[[[  ', '[    ', '[    ', '[    ', '[[[  '],
        ']': ['  ]]]', '    ]', '    ]', '    ]', '  ]]]'],
        '{': ['  {  ', ' {   ', '{{   ', ' {   ', '  {  '],
        '}': ['  }  ', '   } ', '   }}', '   } ', '  }  '],
        '|': ['  |  ', '  |  ', '  |  ', '  |  ', '  |  '],
        '*': ['     ', ' * * ', '  *  ', ' * * ', '     '],
        '&': [' &&  ', '&  & ', ' &&  ', '&  & ', ' && &'],
        '^': ['  ^  ', ' ^ ^ ', '^   ^', '     ', '     '],
        '%': ['%%  %', '%% / ', '  /  ', ' / %%', '%  %%'],
        '$': ['  $  ', ' $$$$', '$$   ', '   $$', '$$$$ '],
        '#': [' # # ', '#####', ' # # ', '#####', ' # # '],
        '@': [' @@@ ', '@   @', '@ @@@', '@    ', ' @@@ '],
        '~': ['     ', ' ~  ~', '     ', '     ', '     ']
      };
      
      const upperText = text.toUpperCase();
      let result = '';
      
      // Generate each row of the ASCII art
      for (let row = 0; row < 5; row++) {
        let line = '';
        for (let i = 0; i < upperText.length; i++) {
          const char = upperText[i];
          const pattern = letters[char] || letters[' '];
          line += pattern[row] + ' ';
        }
        result += line + '\n';
      }
      
      return result;
    }
  },
  matrix: {
    type: 'matrix',
    description: "Activates a Matrix-like screen effect",
    duration: 5000 // milliseconds
  },
  surprise: {
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
  
  // Create matrix rain effect
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
  
  // Set canvas size to match window
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Matrix characters
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  
  // Array to track y position of each column
  const drops: number[] = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }
  
  // Draw the matrix effect
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
  
  // Run animation
  let animationId: number;
  const animate = () => {
    draw();
    animationId = requestAnimationFrame(animate);
  };
  
  animate();
  
  // Clean up after duration
  setTimeout(() => {
    cancelAnimationFrame(animationId);
    document.body.removeChild(canvas);
    callback();
  }, matrixCommand.duration || 5000);
};

// Open the surprise video
export const openSurprise = (): void => {
  const surpriseCommand = terminalCommands.surprise as SurpriseCommand;
  window.open(surpriseCommand.url, '_blank');
};

// Toggle music playback with random track selection
export const toggleMusic = (): boolean => {
  const musicCommand = terminalCommands.music as MusicCommand;
  
  if (!audioElement) {
    audioElement = new Audio();
  }
  
  if (musicCommand.isPlaying) {
    // Stop music
    audioElement.pause();
    musicCommand.isPlaying = false;
  } else {
    // Play random track
    const randomIndex = Math.floor(Math.random() * musicCommand.tracks.length);
    const track = musicCommand.tracks[randomIndex];
    audioElement.src = track.url;
    audioElement.loop = true;
    audioElement.play().catch(err => console.error("Error playing audio:", err));
    musicCommand.isPlaying = true;
    console.log(`Now playing: ${track.name}`);
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
    ascii: "ascii [text] - Converts text to ASCII art",
    matrix: "matrix - Activates a Matrix-like screen effect",
    surprise: "surprise - Opens a fun surprise video",
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
