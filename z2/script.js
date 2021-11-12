$(document).ready(function () {

    let canvas = $("#canvas")[0].getContext('2d');

    $("#btn").on('click', function (e) {
        e.preventDefault();
        let files = $("#file")[0].files;
        if (files.length > 0) {
            if (files[0].name.indexOf(".csv") !== -1) {
                let fd = new FormData();
                fd.append("file", files[0])
                $.ajax({
                    url: "./ajax.php",
                    processData: false,
                    contentType: false,
                    method: 'post',
                    dataType: 'json',
                    data: fd,
                    success: (suc) => {
                        console.log(suc);
                        let canvSet = suc[0];
                        let obsP = suc[1];
                        let buildings = suc.slice(2)

                        $('#canvas').attr('style', `width:${canvSet[0]}px; height:${canvSet[1]}px`);

                        canvas.fillStyle  = 'red';
                        canvas.fillRect(obsP[0], obsP[1], 1, 1);

                        canvas.fillStyle  = 'blue';

                        for (const building of buildings) {
                            console.log(building)
                            canvas.fillRect(building[0], building[1], building[2], building[3]);
                        }
                        // $('#canvas').height = suc['0'][1];


                    },
                    error: (err) => {
                        console.log(err)
                    }
                })

            }
        }
    })

    /*
        $("#file").on('change', function () {
            let file = $(this)[0].files[0]
            console.log(file)
            // console.log($.csv.toObjects(file.name))
            $.get(file, function () {
                console.log("ok")
            })

            var oFReader = new FileReader(); //объект FileReader

            let rawFile = new XMLHttpRequest();
            let f;
            rawFile.open("GET", file);
            rawFile.responseType = 'blob';
            rawFile.send();
            rawFile.onload = function () {
                f = new File(
                    [rawFile.response], name, {
                        type: rawFile.getResponseHeader('content-type'),
                    }
                );
                console.log(f)
                oFReader.readAsDataURL(f)
                oFReader.onload = function (oFREvent) {
                    console.log(oFREvent.tagLength.result)
                }
            }


        });
    */

    /*
        function load_csv(path) {
            let rawFile = new XMLHttpRequest();
            let f;
            rawFile.open("GET", path);
            rawFile.responseType = 'blob';
            rawFile.send();
            rawFile.onload = function () {
                f = new File(
                    [rawFile.response], name, {
                        type: rawFile.getResponseHeader('content-type'),
                    }
                );
                console.log(f)
                oFReader.readAsDataURL(f)
                oFReader.onload = function (oFREvent) {
                    console.log(oFREvent.tagLength.result)
                }
            }

        }*/

});