
const col = ['top', 'top', 'bottom','bottom']
const row = ['left', 'right', 'left', 'right']

export function mosaicMaker(imgArray){
  let urls = [];
  let positions = [];
  let sizes = []
  let repeats = []
  imgArray.forEach((url, i) => {
    urls.push(`url('${url}')`)
    if(i < imgArray.length - 1 || i >= 5){
      positions.push(`${col[i]} ${row[i]}`)
      repeats.push('no-repeat')
      sizes.push('50%')
    } else {
      positions.push('center')
      repeats.push('repeat')
      sizes.push('100%')
    }

  });

  let out = {
    urls: 'radial-gradient( rgba(0,0,0,0.3707983193277311) , rgba(0,0,0,0.7349439775910365) ), '+  urls.join(', '),
    positions: 'center, '+ positions.join(', '),
    sizes: '100%, '+  sizes.join(', '),
    repeats: 'no-repeat, '+  repeats.join(', ')
    };
    return out
}
