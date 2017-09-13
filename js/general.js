var validate = {
		
		validateDataType: function(expresion, data, type){
	
			if(type === 'email') { expresion =  /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/; }
  			if(type === 'string') { expresion = /^[A-Za-z ñ]+$/; }
			if(type === 'dni') { expresion = /^[0-9]{8,15}$/;  }
			if(type === 'cuit') { expresion = /^[0-9]{11,11}$/;  }
			if(type === 'telefono') { expresion = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/; }
			if(type === 'number') { expresion =  /^[0-9]+$/; }
			if(type === 'password') { expresion = /^[0-9a-zA-Z]+$/; }
  			
  			return  expresion.test(data);
		},

		validateInputs: function(elm) {
		
			var expresion = ''
			, 	data = $(elm).val()
			, 	type = $(elm).attr('data-type');

			if(type) {
				(validate.validateDataType(expresion, data, type)) ?
					$(elm).addClass('success').removeClass('error'):	
					$(elm).addClass('error').removeClass('success');			
			}
		
		},

		validateSelect: function(elm) {
			
			var value = $(elm).val();
			
			(value !=null)?
				$(elm).addClass('success').removeClass('error'):	
				$(elm).addClass('error').removeClass('success');
		
		},

		samePassword: function(pw1, pw2) {

			if( pw1.val() === pw2.val() && (pw1.val()!= '' && pw2.val()!= '') ) {
				pw1.addClass('success').removeClass('error');	
				pw2.addClass('success').removeClass('error');	
		
			} else {
				pw1.removeClass('success').addClass('error');	
				pw2.removeClass('success').addClass('error');	
			}
	
		},

		validateMultiSelect: function(elm){

			if($(elm).find('.select2-selection__choice').attr('title')) {
				$(elm).addClass('success').removeClass('error');	
				$(elm).addClass('success').removeClass('error');	
			} else {
				$(elm).removeClass('success').addClass('error');	
				$(elm).removeClass('success').addClass('error');	
			}
		}
		
	}

	// Evento en input del formulario.
	$('form.form-register input').keyup(function(){
		validate.validateInputs(this);
	});

	// Evento en select del formulario.
	$('form.form-register select').on('change',function(){
		validate.validateSelect(this);
	});

	// Evento en boton del formulario.
	$('form.form-register .btn-purple').on('click', function(e){
		
		e.preventDefault();
		
		var error = '';

		// Evaluar Inputs.
		$('form.form-register input').each(function(index,item){
			validate.validateInputs(this);
		});

		// Evaluar Select.
		$('form.form-register select').each(function(index,item){
			validate.validateSelect(this);
		});

		//Evaluar multiselect 
		$('form.form-register .select2-selection.select2-selection--multiple').each(function(index,item) {
			validate.validateMultiSelect(this);
		});

		// Evaluar Contraseñas iguales.
		validate.samePassword($('form.form-register .pw1'), $('form.form-register .pw2'));
		
		// Evaluar todos los campos del formulario en busca de errores.
		$('form.form-register input, form.form-register select, .select2-selection.select2-selection--multiple').each(function(index,item){
		
			if($(item).attr('type') != 'hidden' && $(item).css('display') != 'none') {
				($(item).hasClass('error')) ? error = 'error': '';
			}

		});
	
		// Hacer submit si no encuentra errores.
		(error === '')? $('form.form-register').submit(): void(0); 

	});


	/* -------------------------------------------------------------------------------- */


	$('.fans-registration').on('click',function(e){
		e.preventDefault();

		var error = '';

		$('form.form-register select').each(function(index,item){
			validate.validateSelect(this);
		});


		// Evaluar todos los campos del formulario en busca de errores.
		$('form.form-register select').each(function(index,item){
			if( $(item).css('display') === 'block') {
				($(item).hasClass('error'))? error = 'error': ''; 
			}
		});

	
		// Hacer submit si no encuentra errores.
		(error === '')? $('form.form-register').submit(): void(0); 

	});

	/*--------------------------------------------------------------------------------------*/


	