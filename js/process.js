$(function() {

	$(".adj").hide();

	$("#effects").on('click', function(){		
		$("#adj").hide();
		$("#ba").hide();
		$("#ef").show();
		$("#oth").hide();
	})

	$("#basic").on('click', function(){
		$("#adj").hide();
		$("#ef").hide();
		$("#ba").show();
		$("#oth").hide();
	})

	$("#other").on('click', function(){
		$("#adj").hide();
		$("#ef").hide();
		$("#ba").hide();
		$("#oth").show();
	})


	var fileInput = document.getElementById('fileInput');

	fileInput.addEventListener('change', function(e) {
		var canvas = document.getElementById('photo');
		$("#photo").removeAttr("data-caman-id");
		var context = canvas.getContext("2d");
		var file = fileInput.files[0];
		var imageType = /image.*/;

		if (file.type.match(imageType)) {
			var reader = new FileReader();
				reader.onload = function(e) {
				var img = new Image();
				img.src = reader.result;
				img.onload = function() {
					
					var imgWidth = img.width, imgHeight = img.height;
					var maxWidth, maxHeight;

					maxWidth = $("#item4").width();
					maxHeight = $("#item4").height();

					console.log(maxHeight, maxWidth);

					var ratio = 1, ratio1 = 1, ratio2 = 1;

				    ratio1 = maxWidth / imgWidth;
				    ratio2 = maxHeight / imgHeight;

				    if (ratio1 < ratio2) {
				        ratio = ratio1;
				    }
				    else {
				        ratio = ratio2;
				    }

					var canvasWidth = imgWidth * ratio;
					var canvasHeight = imgHeight * ratio;

					canvas.height = canvasHeight;
					canvas.width = canvasWidth;


					context.drawImage(img, 0, 0, canvasWidth, canvasHeight);

				}
			}
			reader.readAsDataURL(file);	
		} else {
				alert("file not supported");
			}
	});

	$('.fil').on('click', function() {
		var l = this.id;
		Caman("#photo",function(){
			this[l]();
			if(l == "revert") {
				this.revert();
			}
			this.render();
		});
	});

	$('.bas').on('click', function() {
		var bas = this.id;
		$("#ba").hide();
		var adj = $('#adj');
		var bod = '<table><tr><td>'+bas+'</td><td><input min="-100" max="100" step="1" value="0" type="range" class="sld" id="'+bas+'"></td><td id="sdval">0</td></tr></table>';
		adj.html(bod);
		console.log(bod);
		$("#adj").show();

		$('.sld').on('change', function(){
			var i = this.id;
			var j = $(this).val();
			$('#sdval').html(j);
			Caman("#photo", function () {
				this.revert();
				switch(i) {
					case "brightness": this.brightness(j);break;
					case "contrast": this.contrast(j/2);break;
					case "saturation": this.saturation(j);break;
					case "vibrance": this.vibrance(j);break;
					case "exposure": this.exposure(j);break;
					case "sepia": this.sepia(j);break;
					case "hue": this.hue(j);break;
					case "noise": this.noise(j);break;
					case "sharpen": this.sharpen(j);break;
					case "stackBlur": this.stackBlur(j);break;
				}
				this.render();
			});
		});
	});
});
