import alakazam from '../assets/sidebar-wallpapers/minimal-alakazam.jpg';
import bulbasaur from '../assets/sidebar-wallpapers/minimal-bulbasaur.webp';
import eevee from '../assets/sidebar-wallpapers/minimal-eevee.webp';
import vertical from '../assets/sidebar-wallpapers/vertical.jpg';

const images = [
  vertical,
  eevee,
  bulbasaur,
  alakazam
]

export function selectRandomImage(){
  const randomInteger = Math.floor(Math.random() * images.length);

  return images[randomInteger];
}