$(document).ready(function () {

    let canvas = $("#canvas")[0].getContext('2d');

    console.log(canvas)

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