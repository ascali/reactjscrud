// component that contains the logic to delete a product
window.DeleteProductComponent = React.createClass({
    // componentDidMount will be here
	// initialize values
	getInitialState: function() {
	    return {
	        successDelete: null
	    };
	},

	// on mount, change header text
	componentDidMount: function(){
	    $('.page-header h1').text('Delete Product');
	},
	 
	// onDelete will be here
	// handle single row deletion
	onDelete: function(e){
	 
	    // product to delete
	    var productId = this.props.productId;
	 
	    // submit form data to api
	    $.ajax({
	        url: window.location.origin+"/me/native-php-api/api/product/delete.php",
	        type : "POST",
	        contentType : 'application/json',
	        data : JSON.stringify({'id' : productId}),
	        success : function(response) {
	        	console.log('response delete ', response.message);	   
	            // api message
	            this.setState({successDelete: response['message']});     	
	            this.props.changeAppMode('read');
	        }.bind(this),
	        error: function(xhr, resp, text){
	            // show error in console
	            console.log('error showing ', xhr);
	            console.log(xhr, resp, text);
	        }
	    });
	},
	 
	// render will be here
	render: function(){
	 
	    return (
	        <div className='row'>
	        	{
	                this.state.successDelete == "Product was deleted." ?
	                    <div className='alert alert-info'>
	                        Product was updated.
	                    </div>
	                : null
	            }
	 
	            {
	                this.state.successDelete == "Unable to delete product." ?
	                    <div className='alert alert-danger'>
	                        Unable to update product. Please try again.
	                    </div>
	                : null
	            }

	            <div className='col-md-3'></div>
	            <div className='col-md-6'>
	                <div className='panel panel-default'>
	                    <div className='panel-body text-align-center'>Are you sure?</div>
	                    <div className='panel-footer clearfix'>
	                        <div className='text-align-center'>
	                            <button onClick={this.onDelete}
	                                className='btn btn-danger m-r-1em'>Yes</button>
	                            <button onClick={() => this.props.changeAppMode('read')}
	                                className='btn btn-primary'>No</button>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div className='col-md-3'></div>
	        </div>
	    );
	}
});