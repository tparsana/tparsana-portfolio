
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
      // Simple ASCII art conversion
      if (!text) return "Please provide text to convert!";
      
      const largeText = text.split('').join('  ');
      return `
 #####  #####  #####  #####  #####
${largeText.toUpperCase()}
#####  #####  #####  #####  #####`;
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
      { name: "Chill Lofi Beat", url: "https://example.com/lofi1.mp3" },
      { name: "Synthwave Cruisin'", url: "https://example.com/synth1.mp3" },
      { name: "Coding Focus", url: "https://example.com/ambient1.mp3" }
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
  // This would typically create a DOM overlay with the matrix effect
  // For simplicity we're just setting a timeout to simulate the effect
  setTimeout(callback, matrixCommand.duration || 5000);
};

// Open the surprise video
export const openSurprise = (): void => {
  const surpriseCommand = terminalCommands.surprise as SurpriseCommand;
  window.open(surpriseCommand.url, '_blank');
};

// Toggle music playback
export const toggleMusic = (trackIndex: number = 0): boolean => {
  const musicCommand = terminalCommands.music as MusicCommand;
  musicCommand.isPlaying = !musicCommand.isPlaying;
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
    music: "music - Plays background music (toggle with music again)"
  };
};

export default terminalCommands;

