// Referencias a los elementos
const video = document.getElementById('miVideo');
const playPauseButton = document.getElementById('playPause');
const progressBar = document.getElementById('progressBar');
const timeDisplay = document.getElementById('timeDisplay');
const speedControl = document.getElementById('speedControl');
const fullscreenToggle = document.getElementById('fullscreenToggle');
const capturePhotoButton = document.getElementById('capturePhoto');
const canvas = document.getElementById('canvas');
const toggleSubtitlesButton = document.getElementById('toggleSubtitles');
const subtitlesTrack = document.getElementById('subtitlesTrack');
const carouselItems = document.querySelectorAll('.carousel-item');
const expandButton = document.getElementById('expandToggle');
const player = document.querySelector('.player');


// Función para reproducir o pausar el video
function togglePlayPause() {
    if (video.paused) {
        video.play();
        playPauseButton.textContent = '⏸'; // Cambia al icono de pausa
    } else {
        video.pause();
        playPauseButton.textContent = '▶'; // Cambia al icono de reproducir
    }
}

// Evento para el botón de Play/Pause
playPauseButton.addEventListener('click', togglePlayPause);

// Actualizar la barra de progreso
video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.value = progress;

    // Actualizar el tiempo mostrado
    const currentMinutes = Math.floor(video.currentTime / 60);
    const currentSeconds = Math.floor(video.currentTime % 60);
    const totalMinutes = Math.floor(video.duration / 60);
    const totalSeconds = Math.floor(video.duration % 60);
    timeDisplay.textContent = `${String(currentMinutes).padStart(2, '0')}:${String(currentSeconds).padStart(2, '0')} / ${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;
});

// Cambiar la posición del video al mover la barra
progressBar.addEventListener('input', () => {
    const time = (progressBar.value / 100) * video.duration;
    video.currentTime = time;
});

// Función para silenciar o activar el sonido
function toggleMute() {
    video.muted = !video.muted;
    muteButton.textContent = video.muted ? '🔇' : '🔊'; // Cambia el icono
}

// Función para ajustar el volumen
function adjustVolume() {
    video.volume = volumeControl.value;
    muteButton.textContent = video.volume === 0 ? '🔇' : '🔊'; // Actualiza el icono si el volumen es 0
}

// Función para ajustar la velocidad de reproducción
function adjustSpeed() {
    const speed = speedControl.value;
    video.playbackRate = speed; // Cambiar la velocidad del video
    speedDisplay.textContent = `${speed}x`; // Mostrar la velocidad actual
}

// Función para alternar pantalla completa
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        // Si no estamos en pantalla completa, activarla
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) { // Soporte para Safari
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // Soporte para IE/Edge
            video.msRequestFullscreen();
        }
        fullscreenToggle.textContent = "⛶";
    } else {
        // Si estamos en pantalla completa, salir
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Soporte para Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // Soporte para IE/Edge
            document.msExitFullscreen();
        }
        fullscreenToggle.textContent = "⛶";
    }
}

// Función para capturar una fotografía y descargarla
function captureAndDownloadPhoto() {
    const context = canvas.getContext('2d');
    
    // Ajustar el tamaño del canvas al tamaño del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Dibujar el fotograma actual del video en el canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convertir el contenido del canvas a una URL de imagen
    const imageUrl = canvas.toDataURL('image/png');
    
    // Crear un enlace temporal para descargar la imagen
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = `captura_${new Date().getTime()}.png`; // Nombre del archivo
    downloadLink.click(); // Simula un clic para iniciar la descarga
}

// Función para alternar los subtítulos
function toggleSubtitles() {
    if (subtitlesTrack.track.mode === 'showing') {
        // Si los subtítulos están visibles, los ocultamos
        subtitlesTrack.track.mode = 'hidden';
        toggleSubtitlesButton.textContent = 'Subtítulos: Activar';
    } else {
        // Si los subtítulos no están visibles, los mostramos
        subtitlesTrack.track.mode = 'showing';
        toggleSubtitlesButton.textContent = 'Subtítulos: Desactivar';
    }
}

video.addEventListener('click', () => {
    togglePlayPause()
});

// Eventos para botones y controles
playPauseButton.addEventListener('click', togglePlayPause);
muteButton.addEventListener('click', toggleMute);
volumeControl.addEventListener('input', adjustVolume);
speedControl.addEventListener('input', adjustSpeed);
fullscreenToggle.addEventListener('click', toggleFullscreen);
capturePhotoButton.addEventListener('click', captureAndDownloadPhoto);
toggleSubtitlesButton.addEventListener('click', toggleSubtitles);

// Controlar el video con el teclado
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        // Evitar que la página se desplace al presionar la barra espaciadora
        event.preventDefault();
        togglePlayPause();
    } else if (event.code === 'Enter') {
        togglePlayPause(); // También permite reproducir o pausar con Enter
    }
});

// Lista de videos y sus fuentes
const videoSources = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
    // Más videos
];


const subSources = [
    "/sub/video1.vtt",
    "/sub/video2.vtt",
    "/sub/video3.vtt",
    // Más subtitulos
];

// Establecer evento de clic en cada elemento del carrusel
carouselItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Cambiar el video del reproductor al que fue clickeado
        subtitlesTrack.src = subSources[index];
        video.src = videoSources[index];
        
        video.load(); // Recargar el video
        toggleSubtitles()
        toggleSubtitles()
        video.play();
    });
});

// Función para alternar el tamaño del video
expandButton.addEventListener('click', () => {
    player.classList.toggle('expanded'); // Cambiar el tamaño
    // Cambiar el ícono del botón para reflejar el estado
    if (player.classList.contains('expanded')) {
        expandButton.textContent = '🔳'; // Cambiar ícono cuando está agrandado
    } else {
        expandButton.textContent = '🔲'; // Volver a ícono original cuando se regresa al tamaño normal
    }
});