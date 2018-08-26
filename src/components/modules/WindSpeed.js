const ConvertWindSpeedToPixel = (windSpeed) => {
  let width = window.innerWidth;
  let pixelDistancePerSec = windSpeed * 10;

  return width / pixelDistancePerSec;
}

export default ConvertWindSpeedToPixel;