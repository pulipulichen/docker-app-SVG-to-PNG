const ShellSpawn = require('./lib/ShellSpawn')
const ShellExec = require('./lib/ShellExec')
const GetExistedArgv = require('./lib/GetExistedArgv')

const path = require('path')
const fs = require('fs')

// convert a.tif -thumbnail 64x64^ -gravity center -extent 64x64 b.ico

let main = async function () {
  let files = GetExistedArgv()
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    
    let filename = path.basename(file)
    let dirname = path.dirname(file)
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
    await ShellExec(`convert -background none -size 256x "${file}" "${path.resolve(dirname, filenameNoExt + '.png')}"`)
  }
}

main()