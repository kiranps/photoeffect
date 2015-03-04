window.onload = function() {

		var fileInput = document.getElementById('fileInput');
		
		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var imageType = /image.*/;

			if (file.type.match(imageType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					var img = new Image();	
					img.src = reader.result;
					image = img.src;
					var canvas = document.getElementById('photo');
					canvas.width = 500;
					canvas.height = 500/img.width*img.height;
					var context = canvas.getContext("2d");
					img.onload = function() {
						context.drawImage(img, 0, 0,500,500/img.width*img.height);
					}
				}

				reader.readAsDataURL(file);	
			} else {
				fileDisplayArea.innerHTML = "File not supported!";
			}
		});

}
