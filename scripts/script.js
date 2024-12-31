       // Previous script remains the same until updateCardBack()
       const imageUrls = [
        'images/unicorn.jpg',
        'images/spider.jpg',
        'images/bird.jpg',
        'images/monkey.jpg',
        'images/fish.jpg',
        'images/elephant.jpg',
        'images/lion.jpg',
        'images/cat.jpg',
        'images/cat2.jpg',
        'images/dog.jpg',
        'images/blue_giraff.jpg',
        'images/blue_gorilla.jpg',
        'images/blue_spider.jpg',
        'images/giraff.jpg',
        'images/gorilla.jpg',
        'images/lemur.jpg',
        'images/otter.jpg',
        'images/rainbow_monkey.jpg',
        'images/red_lion.jpg',
        'images/red_spider.jpg',
        'images/shark.jpg',
        'images/tiger.jpg',
        'images/trex.jpg',
        'images/whale.jpg',
        'images/woodpecker.jpg',
        'images/spider1.jpg',
        'images/spider2.jpg',
        'images/spider3.jpg',
        'images/spider4.jpg',
        'images/spider5.jpg',
        'images/spider6.jpg',
        'images/spider7.jpg',
        'images/spider8.jpg',
        'images/spider9.jpg',
        'images/spider10.jpg',
        'images/spider11.jpg',
        'images/spider12.jpg',
        'images/spider13.jpg',
        'images/spider14.jpg',
        'images/spider15.jpg',
        'images/spider16.jpg',
        'images/pteradactyl.jpg'
    ];

    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let preloadedImages = new Set();

    // Rest of the previous functions remain the same
    function preloadImages(urls) {
        const preloader = document.getElementById('preloader');
        preloader.innerHTML = '';

        urls.forEach(url => {
            if (!preloadedImages.has(url)) {
                const img = new Image();
                img.src = url;
                preloader.appendChild(img);
                preloadedImages.add(url);
            }
        });
    }

    function createCard(imageUrl) {
        const card = document.createElement('div');
        const pattern = document.getElementById('cardPattern').value;
        card.className = `card pattern-dots`;
        card.dataset.image = imageUrl;

        // const size = 250;
        // card.style.width = `${size}px`;
        // card.style.height = `${size}px`;

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Card Image';
        card.appendChild(img);

        card.addEventListener('click', flipCard);
        return card;
    }

    // Previous functions remain the same
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function getGridSize(pairCount) {
        const totalCards = pairCount * 2;
        if (totalCards <= 12) return 3;
        if (totalCards <= 20) return 4;
        return 5;
    }

    function getRandomImages(imageUrls, pairCount) {
        const result = [];
        const availableImages = [...imageUrls];

        for (let i = 0; i < pairCount; i++) {
            const randomIndex = Math.floor(Math.random() * availableImages.length);
            result.push(availableImages[randomIndex]);
            console.log(availableImages[randomIndex]);
            availableImages.splice(randomIndex, 1); // Remove selected image to avoid duplicates
        }
        console.log(result);
        return result;
    }

    function initializeGame() {
        const pairCount = parseInt(document.getElementById('pairCount').value);
        const gameImages = getRandomImages(imageUrls, pairCount);

        preloadImages(gameImages);

        cards = shuffleArray([...gameImages, ...gameImages]);

        const grid = document.getElementById('grid');
        grid.innerHTML = '';

        const gridSize = getGridSize(pairCount);
        grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

        cards.forEach(imageUrl => {
            const card = createCard(imageUrl);
            grid.appendChild(card);
        });
    }

    function flipCard() {
        if (
            flippedCards.length === 2 ||
            this.classList.contains('flipped') ||
            this.classList.contains('matched')
        ) {
            return;
        }

        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            // document.getElementById('moves').textContent = moves;
            checkMatch();
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.image === card2.dataset.image) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            document.getElementById('matches').textContent = matchedPairs;

            const pairCount = parseInt(document.getElementById('pairCount').value);
            if (matchedPairs === pairCount) {
                setTimeout(() => {
                    alert(`Congratulations! You won in ${moves} moves!`);
                }, 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 1000);
        }
        flippedCards = [];
    }

    function resetGame() {
        moves = 0;
        matchedPairs = 0;
        flippedCards = [];
        // document.getElementById('moves').textContent = moves;
        // document.getElementById('matches').textContent = matchedPairs;
        initializeGame();
    }
    function toggleSettings() {
        const settings = document.getElementById('settings');
        settings.classList.toggle('display');
    }
    // Start the game
    initializeGame();