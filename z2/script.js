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

                        canvas.fillStyle = 'red';
                        canvas.fillRect(obsP[0], obsP[1], 1, 1);

                        canvas.fillStyle = 'blue';
                        let objs = {}, i = 0;
                        for (const building of buildings) {
                            console.log(building)
                            canvas.fillRect(building[0], building[1], building[2], building[3]);
                            let o_x1 = building[0],
                                o_x2 = building[0] + building[2],
                                o_y1 = building[1],
                                o_y2 = building[1] + building[3];

                            objs[i++] = {
                                AB: {
                                    A: o_y2 - o_y1,
                                    B: o_x1 - o_x1,
                                    C: -o_x1 * o_y2 + o_x2 * o_y1,
                                    X1: o_x1,
                                    Y1: o_y1,
                                    X2: o_x1,
                                    Y2: o_y2
                                },
                                BC: {
                                    A: o_y2 - o_y2,
                                    B: o_x2 - o_x1,
                                    C: -o_x1 * o_y2 + o_x2 * o_y1,
                                    X1: o_x1,
                                    Y1: o_y2,
                                    X2: o_x2,
                                    Y2: o_y2
                                },
                                CD: {
                                    A: o_y1 - o_y2,
                                    B: o_x2 - o_x2,
                                    C: -o_x1 * o_y2 + o_x2 * o_y1,
                                    X1: o_x2,
                                    Y1: o_y2,
                                    X2: o_x2,
                                    Y2: o_y1
                                },
                                DA: {
                                    A: o_y1 - o_y1,
                                    B: o_x1 - o_x2,
                                    C: -o_x1 * o_y2 + o_x2 * o_y1,
                                    X1: o_x2,
                                    Y1: o_y1,
                                    X2: o_x1,
                                    Y2: o_y1
                                },
                            }

                        }
                        console.log(objs)

                        let y2 = 0,
                            y1 = obsP[1],
                            x1 = obsP[0];
                        for (let x2 = 0; x2 < canvSet[0]; x2++) { //ширина
                            let A1 = y2 - y1,
                                B1 = x1 - x2,
                                C1 = x1 * y2 + x2 * y1;
                            for (const objsKey in objs) {
                                for (const otr in objs[objsKey]) {
                                    let X = (C1 * objs[objsKey][otr].B - objs[objsKey][otr].C * B1) / (A1 * objs[objsKey][otr].B - objs[objsKey][otr].A * B1)
                                    console.log(X)
                                    console.log(X)
                                }
                            }


                            console.log(`${y2 - y1}*x+${x1 - x2}*y-${x1 * y2 + x2 * y1}`)
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