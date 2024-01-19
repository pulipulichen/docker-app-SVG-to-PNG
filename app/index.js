const ShellSpawn = require('./lib/ShellSpawn')
const ShellExec = require('./lib/ShellExec')
const GetFiles = require('./lib/GetFiles')

const path = require('path')
const fs = require('fs')

// convert a.tif -thumbnail 64x64^ -gravity center -extent 64x64 b.ico

let main = async function () {
  let files = GetFiles()
  for (let i = 0; i < files.length; i++) {
    let file = files[i]

    if (file.endsWith('.svg') === false) {
      continue
    }
    
    let filename = path.basename(file)
    //let dirname = path.dirname(file)
    let dirname = '/output/'
    let filenameNoExt = filename
    if (filenameNoExt.indexOf('.') > -1) {
      filenameNoExt = filenameNoExt.slice(0, filenameNoExt.lastIndexOf('.'))
    }
    // await ShellSpawn(`img2pdf -o "/input/${filenameNoExt}.pdf" ${imgs.join(" ")}`)
    // await ShellExec(`convert "${file}" -flatten -fuzz 1% -trim +repage -thumbnail 64x64^ -gravity center -extent 64x64 "${path.resolve(dirname, filenameNoExt + '.ico')}"`)
    // convert "a.png" -flatten -fuzz 1% -trim +repage -thumbnail 64x64^ -gravity center -extent 64x64 "b.ico"

    // await ShellExec(`convert -gravity center "${file}" -flatten -fuzz 1% -trim +repage -resize 64x64 -extent 64x64 "${path.resolve(dirname, filenameNoExt + '.ico')}"`)
    // convert -gravity center "c.png" -flatten -fuzz 1% -trim +repage -resize 64x64 -extent 64x64 "b.ico"
    // await ShellExec(`svgexport "${file}" "${path.resolve(dirname, filenameNoExt + '.png')}" 256:`)
    // -background none -size x1080 in.svg out.png
    
    // await ShellExec(`convert -resize 256x -background none -extent 256x "${file}" "${path.resolve(dirname, filenameNoExt + '.png')}"`)
    // await ShellExec(`convert -density 300 -font /noto.woff -background none "${file}" "${path.resolve(dirname, filenameNoExt + '.png')}"`)


    // await ShellExec(`inkscape --version`)

    await ShellExec(`inkscape --export-dpi=300 --export-background=white --export-png="${path.resolve(dirname, filenameNoExt + '-tmp.png')}" "${file}"`)

    // console.log({file})

    await ShellExec(`inkscape --export-emf="${path.resolve(dirname, filenameNoExt + '.emf')}" "${file}"`)

    await ShellExec(`convert "${path.resolve(dirname, filenameNoExt + '-tmp.png')}" -alpha set -bordercolor white -border 1 -fill none -fuzz 1% -draw "color 0,0 floodfill" -shave 1x1 -fuzz 5% -trim +repage "${path.resolve(dirname, filenameNoExt + '.png')}"`)
    fs.unlinkSync(path.resolve(dirname, filenameNoExt + '-tmp.png'))
  }
}

main()