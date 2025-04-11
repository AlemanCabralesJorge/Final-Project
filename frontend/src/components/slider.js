export function sliderControl() {
    const siguiente = document.querySelector('.siguiente');
    const anterior = document.querySelector('.anterior');
    const slider = document.querySelector('.slider');
    const audio = document.getElementById('slide-sound');

    if (!siguiente || !anterior || !slider || !audio) return;

    siguiente.addEventListener('click', () => {
        const slides = document.querySelectorAll('.slides');
        slider.appendChild(slides[0]);
        audio.currentTime = 0;
        audio.play();
    });

    anterior.addEventListener('click', () => {
        const slides = document.querySelectorAll('.slides');
        slider.prepend(slides[slides.length - 1]);
        audio.currentTime = 0;
        audio.play();
    });
}
