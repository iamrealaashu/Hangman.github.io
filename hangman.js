document.addEventListener('DOMContentLoaded', () => {
            // Game state
            const gameState = {
                currentWord: '',
                displayWord: [],
                category: 'animals',
                difficulty: 'easy',
                livesRemaining: 6,
                guessedLetters: new Set(),
                gameOver: false,
                wordBank: {
                    animals: {
                        easy: ['cat', 'dog', 'bear', 'fish', 'bird', 'lion', 'duck', 'frog', 'wolf', 'cow'],
                        medium: ['giraffe', 'elephant', 'penguin', 'leopard', 'dolphin', 'koala', 'squirrel', 'cheetah'],
                        hard: ['platypus', 'orangutan', 'hippopotamus', 'rhinoceros', 'chameleon', 'armadillo', 'scorpion']
                    },
                    countries: {
                        easy: ['spain', 'china', 'italy', 'japan', 'egypt', 'cuba', 'peru', 'chile'],
                        medium: ['germany', 'australia', 'mexico', 'turkey', 'sweden', 'morocco', 'thailand'],
                        hard: ['kazakhstan', 'azerbaijan', 'venezuela', 'switzerland', 'mozambique', 'philippines']
                    },
                    tech: {
                        easy: ['mouse', 'phone', 'cable', 'wifi', 'screen', 'email', 'video'],
                        medium: ['internet', 'software', 'database', 'network', 'browser', 'bluetooth'],
                        hard: ['algorithm', 'encryption', 'javascript', 'artificial', 'cryptocurrency', 'virtualization']
                    },
                    sports: {
                        easy: ['golf', 'ball', 'race', 'swim', 'team', 'run', 'jump', 'goal'],
                        medium: ['football', 'baseball', 'tennis', 'cricket', 'cycling', 'skiing', 'volleyball'],
                        hard: ['weightlifting', 'badminton', 'taekwondo', 'windsurfing', 'snowboarding', 'gymnastics']
                    },
                    movies: {
                        easy: ['film', 'star', 'cast', 'role', 'plot', 'scene', 'award'],
                        medium: ['director', 'producer', 'screenplay', 'thriller', 'comedy', 'musical', 'animation'],
                        hard: ['cinematography', 'documentary', 'choreography', 'adaptation', 'screenplay', 'protagonist']
                    }
                },
                hints: {
                    animals: {
                        cat: 'A common household pet that purrs',
                        dog: 'Man\'s best friend',
                        bear: 'A large mammal that hibernates',
                        fish: 'Lives in water with gills and fins',
                        bird: 'Has feathers and can fly',
                        lion: 'King of the jungle',
                        duck: 'Quacks and swims in ponds',
                        frog: 'Amphibian that jumps and croaks',
                        wolf: 'Howls at the moon',
                        cow: 'Gives milk and says "moo"',
                        giraffe: 'Has a very long neck',
                        elephant: 'Largest land mammal with a trunk',
                        penguin: 'Flightless bird that loves cold weather',
                        leopard: 'Big cat with spotted coat',
                        dolphin: 'Intelligent marine mammal',
                        koala: 'Australian animal that eats eucalyptus',
                        squirrel: 'Collects nuts and has a bushy tail',
                        cheetah: 'Fastest land animal',
                        platypus: 'Egg-laying mammal with a duck bill',
                        orangutan: 'Great ape with reddish fur',
                        hippopotamus: 'Large semi-aquatic African mammal',
                        rhinoceros: 'Large mammal with horns on its nose',
                        chameleon: 'Lizard that can change colors',
                        armadillo: 'Mammal with a leathery armor shell',
                        scorpion: 'Arachnid with a venomous stinger'
                    },
                    // Add hints for other categories similarly...
                    countries: {
                        spain: 'Known for flamenco and tapas',
                        china: 'Has the Great Wall',
                        italy: 'Known for pizza and pasta',
                        japan: 'Land of the rising sun',
                        egypt: 'Famous for pyramids',
                        cuba: 'Caribbean island known for cigars',
                        peru: 'Home to Machu Picchu',
                        chile: 'Long, narrow country in South America',
                        germany: 'Known for beer and sausages',
                        australia: 'Home to kangaroos and koalas',
                        mexico: 'Known for tacos and tequila',
                        turkey: 'Country that spans two continents',
                        sweden: 'Scandinavian country with IKEA',
                        morocco: 'North African country known for bazaars',
                        thailand: 'Southeast Asian country known as Land of Smiles',
                        kazakhstan: 'Largest landlocked country in the world',
                        azerbaijan: 'Caspian Sea country known for oil',
                        venezuela: 'South American country with Angel Falls',
                        switzerland: 'Alpine country known for chocolate and watches',
                        mozambique: 'African country with a gun on its flag',
                        philippines: 'Southeast Asian archipelago with over 7,000 islands'
                    },
                    tech: {
                        mouse: 'Used to point and click',
                        phone: 'Used to make calls',
                        cable: 'Connects electronic devices',
                        wifi: 'Wireless internet connection',
                        screen: 'Displays images and videos',
                        email: 'Electronic messages sent online',
                        video: 'Moving images recorded digitally',
                        internet: 'Global network of connected computers',
                        software: 'Programs that run on computers',
                        database: 'Organized collection of data',
                        network: 'Interconnected computers sharing resources',
                        browser: 'Program used to access websites',
                        bluetooth: 'Wireless technology for short distances',
                        algorithm: 'Step-by-step procedure for calculations',
                        encryption: 'Converting information into a code',
                        javascript: 'Popular programming language for web',
                        artificial: 'Man-made intelligence in computers',
                        cryptocurrency: 'Digital or virtual currency',
                        virtualization: 'Creating virtual versions of something'
                    },
                    sports: {
                        golf: 'Game played with clubs and a small ball',
                        ball: 'Round object used in many sports',
                        race: 'Competition of speed',
                        swim: 'Move through water using arms and legs',
                        team: 'Group of players forming one side',
                        run: 'Move at a speed faster than walking',
                        jump: 'Push oneself off a surface',
                        goal: 'Designated area where points are scored',
                        football: 'Popular sport played with a ball',
                        baseball: 'American pastime with bats and balls',
                        tennis: 'Racket sport played on a court',
                        cricket: 'Bat-and-ball game popular in England',
                        cycling: 'Racing on bicycles',
                        skiing: 'Winter sport sliding on snow',
                        volleyball: 'Team sport with a net and ball',
                        weightlifting: 'Sport testing strength',
                        badminton: 'Racket sport with a shuttlecock',
                        taekwondo: 'Korean martial art',
                        windsurfing: 'Water sport combining surfing and sailing',
                        snowboarding: 'Winter sport on a single board',
                        gymnastics: 'Sport involving acrobatic exercises'
                    },
                    movies: {
                        film: 'Another word for movie',
                        star: 'Famous actor or actress',
                        cast: 'All actors in a movie',
                        role: 'Character played by an actor',
                        plot: 'Story of a movie',
                        scene: 'Section of a movie',
                        award: 'Prize given for excellence',
                        director: 'Person who controls a film\'s artistic aspects',
                        producer: 'Person who oversees film production',
                        screenplay: 'Written text of a film',
                        thriller: 'Genre designed to excite and thrill',
                        comedy: 'Funny film genre',
                        musical: 'Film with song and dance',
                        animation: 'Film made with drawings or computer graphics',
                        cinematography: 'Art of movie photography',
                        documentary: 'Factual film about real people or events',
                        choreography: 'Planning and arranging of dance movements',
                        adaptation: 'Film based on another work',
                        protagonist: 'Main character in a story'
                    }
                },
                stats: {
                    gamesPlayed: 0,
                    gamesWon: 0,
                    gamesLost: 0
                },
                soundEnabled: true,
                darkTheme: false
            };

            // DOM Elements
            const wordDisplay = document.getElementById('word-display');
            const keyboard = document.getElementById('keyboard');
            const livesCount = document.getElementById('lives-count');
            const categorySelect = document.getElementById('category-select');
            const difficultySelect = document.getElementById('difficulty-select');
            const restartBtn = document.getElementById('restart-btn');
            const newGameBtn = document.getElementById('new-game-btn');
            const hintBtn = document.getElementById('hint-btn');
            const gameOverModal = document.getElementById('game-over-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalMessage = document.getElementById('modal-message');
            const revealWord = document.getElementById('reveal-word');
            const modalRestart = document.getElementById('modal-restart');
            const modalClose = document.getElementById('modal-close');
            const hintModal = document.getElementById('hint-modal');
            const hintText = document.getElementById('hint-text');
            const hintModalClose = document.getElementById('hint-modal-close');
            const difficultyDots = document.querySelectorAll('.difficulty-dot');
            const soundToggle = document.querySelector('.sound-toggle');
            const themeToggle = document.querySelector('.theme-toggle');
            const challengeModal = document.getElementById('challenge-modal');
            const challengeCodeDisplay = document.getElementById('challenge-code-display');
            const copyCodeBtn = document.getElementById('copy-code-btn');
            const challengeModalClose = document.getElementById('challenge-modal-close');
            const createChallengeBtn = document.getElementById('create-challenge-btn');
            const joinChallengeBtn = document.getElementById('join-challenge-btn');
            const customWordInput = document.getElementById('custom-word');
            const challengeCodeInput = document.getElementById('challenge-code');

            // Stats elements
            const gamesPlayedEl = document.getElementById('games-played');
            const gamesWonEl = document.getElementById('games-won');
            const gamesLostEl = document.getElementById('games-lost');
            const winPercentageEl = document.getElementById('win-percentage');

            // Sound elements
            const correctSound = document.getElementById('correct-sound');
            const incorrectSound = document.getElementById('incorrect-sound');
            const winSound = document.getElementById('win-sound');
            const loseSound = document.getElementById('lose-sound');

            // Initialize the game
            initGame();

            // Event Listeners
            categorySelect.addEventListener('change', () => {
                gameState.category = categorySelect.value;
                startNewGame();
            });

            difficultySelect.addEventListener('change', () => {
                gameState.difficulty = difficultySelect.value;
                updateDifficultyDots();
                startNewGame();
            });

            restartBtn.addEventListener('click', () => {
                if (gameState.gameOver) {
                    startNewGame();
                } else {
                    resetCurrentGame();
                }
            });

            newGameBtn.addEventListener('click', startNewGame);

            hintBtn.addEventListener('click', showHint);

            modalRestart.addEventListener('click', () => {
                gameOverModal.classList.remove('active');
                startNewGame();
            });

            modalClose.addEventListener('click', () => {
                gameOverModal.classList.remove('active');
            });

            hintModalClose.addEventListener('click', () => {
                hintModal.classList.remove('active');
            });

            soundToggle.addEventListener('click', toggleSound);

            themeToggle.addEventListener('click', toggleTheme);

            createChallengeBtn.addEventListener('click', createChallenge);

            joinChallengeBtn.addEventListener('click', joinChallenge);

            copyCodeBtn.addEventListener('click', copyToClipboard);

            challengeModalClose.addEventListener('click', () => {
                challengeModal.classList.remove('active');
            });

            // Initialize game
            function initGame() {
                createKeyboard();
                updateDifficultyDots();
                loadStats();
                updateStatsDisplay();
                startNewGame();
            }

            // Create keyboard
            function createKeyboard() {
                const letters = 'abcdefghijklmnopqrstuvwxyz';
                keyboard.innerHTML = '';

                for (const letter of letters) {
                    const key = document.createElement('div');
                    key.classList.add('key');
                    key.textContent = letter;
                    key.dataset.letter = letter;
                    key.addEventListener('click', () => handleGuess(letter));
                    keyboard.appendChild(key);
                }

                // Add keyboard event listener for physical keyboard
                document.addEventListener('keydown', (e) => {
                    if (gameState.gameOver) return;

                    const key = e.key.toLowerCase();
                    if (/^[a-z]$/.test(key) && !gameState.guessedLetters.has(key)) {
                        handleGuess(key);
                    }
                });
            }

            // Update difficulty dots
            function updateDifficultyDots() {
                const difficultyIndex = ['easy', 'medium', 'hard'].indexOf(gameState.difficulty);

                difficultyDots.forEach((dot, index) => {
                    if (index <= difficultyIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }

            // Start a new game
            function startNewGame() {
                resetGameState();
                selectRandomWord();
                updateWordDisplay();
                updateLivesDisplay();
                updateHangmanFigure();
            }

            // Reset current game (same word)
            function resetCurrentGame() {
                gameState.livesRemaining = getMaxLives();
                gameState.guessedLetters = new Set();
                gameState.gameOver = false;

                updateWordDisplay();
                updateLivesDisplay();
                updateHangmanFigure();
                resetKeyboard();
            }

            // Reset game state
            function resetGameState() {
                gameState.currentWord = '';
                gameState.displayWord = [];
                gameState.livesRemaining = getMaxLives();
                gameState.guessedLetters = new Set();
                gameState.gameOver = false;

                resetKeyboard();
            }

            // Reset keyboard
            function resetKeyboard() {
                const keys = document.querySelectorAll('.key');
                keys.forEach(key => {
                    key.classList.remove('disabled', 'correct', 'incorrect');
                });
            }

            // Select a random word
            function selectRandomWord() {
                const words = gameState.wordBank[gameState.category][gameState.difficulty];
                gameState.currentWord = words[Math.floor(Math.random() * words.length)];
            }

            // Update word display
            function updateWordDisplay() {
                wordDisplay.innerHTML = '';
                gameState.displayWord = [];

                for (const char of gameState.currentWord) {
                    const letterBlank = document.createElement('div');
                    letterBlank.classList.add('letter-blank');

                    if (gameState.guessedLetters.has(char) || !isLetter(char)) {
                        letterBlank.textContent = char;
                        gameState.displayWord.push(char);
                    } else {
                        letterBlank.textContent = '';
                        gameState.displayWord.push('_');
                    }

                    wordDisplay.appendChild(letterBlank);
                }
            }

            // Handle guess
            function handleGuess(letter) {
                if (gameState.gameOver || gameState.guessedLetters.has(letter)) return;

                gameState.guessedLetters.add(letter);
                const key = document.querySelector(`.key[data-letter="${letter}"]`);

                if (gameState.currentWord.includes(letter)) {
                    key.classList.add('correct');
                    playSound(correctSound);

                    // Apply animation to correct letters
                    const letterBlanks = document.querySelectorAll('.letter-blank');
                    let index = 0;
                    for (const char of gameState.currentWord) {
                        if (char === letter) {
                            letterBlanks[index].classList.add('correct-animation');
                            setTimeout(() => {
                                letterBlanks[index].classList.remove('correct-animation');
                            }, 500);
                        }
                        index++;
                    }
                } else {
                    key.classList.add('incorrect');
                    gameState.livesRemaining--;
                    playSound(incorrectSound);

                    // Apply animation to hangman
                    const hangmanPart = document.getElementById(`part-${10 - gameState.livesRemaining - 1}`);
                    if (hangmanPart) {
                        hangmanPart.classList.add('incorrect-animation');
                        setTimeout(() => {
                            hangmanPart.classList.remove('incorrect-animation');
                        }, 500);
                    }
                }

                key.classList.add('disabled');

                updateWordDisplay();
                updateLivesDisplay();
                updateHangmanFigure();
                checkGameState();
            }

            // Update lives display
            function updateLivesDisplay() {
                livesCount.textContent = gameState.livesRemaining;
            }

            // Update hangman figure
            function updateHangmanFigure() {
                const maxLives = getMaxLives();
                const partsToShow = maxLives - gameState.livesRemaining;

                for (let i = 0; i <= 9; i++) {
                    const part = document.getElementById(`part-${i}`);
                    if (i <= partsToShow) {
                        part.style.opacity = '1';
                    } else {
                        part.style.opacity = '0';
                    }
                }
            }

            // Check game state
            function checkGameState() {
                const currentDisplayWord = gameState.displayWord.join('');

                if (currentDisplayWord === gameState.currentWord) {
                    gameState.gameOver = true;
                    gameState.stats.gamesPlayed++;
                    gameState.stats.gamesWon++;
                    saveStats();
                    updateStatsDisplay();

                    playSound(winSound);

                    // Win animation
                    wordDisplay.classList.add('win-animation');
                    setTimeout(() => {
                        wordDisplay.classList.remove('win-animation');
                    }, 1000);

                    showGameOverModal(true);
                } else if (gameState.livesRemaining <= 0) {
                    gameState.gameOver = true;
                    gameState.stats.gamesPlayed++;
                    gameState.stats.gamesLost++;
                    saveStats();
                    updateStatsDisplay();

                    playSound(loseSound);

                    showGameOverModal(false);
                }
            }

            // Show game over modal
            function showGameOverModal(isWin) {
                if (isWin) {
                    modalTitle.textContent = 'Congratulations!';
                    modalMessage.innerHTML = `You correctly guessed the word: <span id="reveal-word" class="font-bold">${gameState.currentWord}</span>`;
                } else {
                    modalTitle.textContent = 'Game Over';
                    modalMessage.innerHTML = `The word was: <span id="reveal-word" class="font-bold">${gameState.currentWord}</span>`;
                }

                gameOverModal.classList.add('active');
            }

            // Show hint
            function showHint() {
                const hint = gameState.hints[gameState.category][gameState.currentWord] ||
                    'No hint available for this word.';

                hintText.textContent = hint;
                hintModal.classList.add('active');
            }

            // Toggle sound
            function toggleSound() {
                gameState.soundEnabled = !gameState.soundEnabled;

                if (gameState.soundEnabled) {
                    soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                } else {
                    soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                }
            }

            // Play sound
            function playSound(sound) {
                if (gameState.soundEnabled) {
                    sound.currentTime = 0;
                    sound.play().catch(e => console.log("Error playing sound:", e));
                }
            }

            // Toggle theme
            function toggleTheme() {
                gameState.darkTheme = !gameState.darkTheme;

                if (gameState.darkTheme) {
                    document.body.classList.add('dark-theme');
                    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                } else {
                    document.body.classList.remove('dark-theme');
                    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                }
            }

            // Create challenge
            function createChallenge() {
                const customWord = customWordInput.value.trim().toLowerCase();

                if (customWord.length < 3) {
                    alert('Please enter a word with at least 3 letters.');
                    return;
                }

                if (!/^[a-z]+$/.test(customWord)) {
                    alert('Please use only letters (a-z) in your word.');
                    return;
                }

                // Generate a random challenge code
                const challengeCode = generateChallengeCode();

                // In a real app, you would save this to a database
                // For this demo, we'll just show the code

                challengeCodeDisplay.textContent = challengeCode;
                challengeModal.classList.add('active');

                // Clear the input
                customWordInput.value = '';
            }

            // Join challenge
            function joinChallenge() {
                const challengeCode = challengeCodeInput.value.trim().toUpperCase();

                if (challengeCode.length !== 6) {
                    alert('Please enter a valid 6-character challenge code.');
                    return;
                }

                // In a real app, you would fetch the word from a database
                // For this demo, we'll just set a random word

                alert(`Joining challenge ${challengeCode}! (In a real app, this would load a friend's word)`);
                startNewGame();

                // Clear the input
                challengeCodeInput.value = '';
            }

            // Generate challenge code
            function generateChallengeCode() {
                const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed similar-looking characters
                let code = '';

                for (let i = 0; i < 6; i++) {
                    code += chars.charAt(Math.floor(Math.random() * chars.length));
                }

                return code;
            }

            // Copy to clipboard
            function copyToClipboard() {
                const text = challengeCodeDisplay.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    alert('Challenge code copied to clipboard!');
                }).catch(err => {
                    console.error('Could not copy text: ', err);
                });
            }

            // Load stats
            function loadStats() {
                const savedStats = localStorage.getItem('hangmanStats');

                if (savedStats) {
                    gameState.stats = JSON.parse(savedStats);
                }
            }

            // Save stats
            function saveStats() {
                localStorage.setItem('hangmanStats', JSON.stringify(gameState.stats));
            }

            // Update stats display
            function updateStatsDisplay() {
                gamesPlayedEl.textContent = gameState.stats.gamesPlayed;
                gamesWonEl.textContent = gameState.stats.gamesWon;
                gamesLostEl.textContent = gameState.stats.gamesLost;

                const winPercentage = gameState.stats.gamesPlayed > 0
                    ? Math.round((gameState.stats.gamesWon / gameState.stats.gamesPlayed) * 100)
                    : 0;

                winPercentageEl.textContent = `${winPercentage}%`;
            }

            // Helper functions
            function isLetter(char) {
                return /[a-zA-Z]/.test(char);
            }

            function getMaxLives() {
                switch (gameState.difficulty) {
                    case 'easy': return 8;
                    case 'medium': return 6;
                    case 'hard': return 4;
                    default: return 6;
                }
            }
        });