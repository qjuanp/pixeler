(function () {
    var video = document.getElementById('video')
    var pixelatedCanvas = document.getElementById('pixelated')
    var canvasContext = pixelatedCanvas.getContext('2d')
    var blocks = document.getElementById('blocks')
    var snap = document.getElementById('snap')

    canvasContext.mozImageSmoothingEnabled = false
    canvasContext.webkitImageSmoothingEnabled = false
    canvasContext.imageSmoothingEnabled = false

    var width = video.width
    var height = video.height

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator
            .mediaDevices
            .getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream
                video.play()
            })
    }

    var pixelate = function (size) {
        var scalatedWidth = width * size * 0.05
        var scalatedHeight = height * size * 0.05

        canvasContext.drawImage(video, 0, 0, scalatedWidth, scalatedHeight)

        canvasContext.drawImage(pixelatedCanvas, 0, 0, scalatedWidth, scalatedHeight, 0, 0, pixelatedCanvas.width,pixelatedCanvas.height)

        return;
    }

    var scanner = function () {
        pixelate(blocks.value)
        setTimeout(function () { scanner() }, 16)
    }


    scanner()

    snap.addEventListener('click', function(){
        pixelatedCanvas.toBlob(function(blob) {
            saveAs(blob,'pixeler.png')
        })
    })

})();