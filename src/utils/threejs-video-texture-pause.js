// Monkey patches three.js to stop doing texture uploads for paused videos
THREE.VideoTexture.prototype.update = function() {
// -- Soical Hubs: Applying another monkey patch to three.js for running videos at 40 frames
//THREE.VideoTexture.prototype.update = setInterval(function() {
  const video = this.image;
  const paused = video.paused;

  // Don't transfer textures from paused videos.
  if (paused && this.wasPaused) return;

  if (video.readyState >= video.HAVE_CURRENT_DATA) {
    if (paused) {
      this.wasPaused = true;
    } else if (this.wasPaused) {
      this.wasPaused = false;
    }

    this.needsUpdate = true;
  }
};
//}, 1000/25);
