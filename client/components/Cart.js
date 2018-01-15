import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GetPurchasesAll, GetUnorderedPurchasesUser, GetOldPurchasesUser, UpdatePurchase, AddPurchase, DeletePurchase } from '../store/purchases'
import store from '../store'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';


class Cart extends Component {
  constructor(props) {
    super(props)
  }

  state = {
  open: false, // naming, modal
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.history.push('/cheeses')
  };

  componentDidMount(){
    this.props.loadCart(2)
    //need a session id
  }

  render(){
    const cartTotal = this.props.unpurchasedOrders.reduce((a,b)=>{
      return a + (b.cheese.price * b.quantity)
    },0)
    if(this.props.unpurchasedOrders) return (
      <div className="cartTableContainer">
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Cheese</TableHeaderColumn>
              <TableHeaderColumn>Quantity</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
              <TableHeaderColumn>Total</TableHeaderColumn>
              <TableHeaderColumn>Add</TableHeaderColumn>
              <TableHeaderColumn>Remove</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {
            this.props.unpurchasedOrders.map(cartItem=>{
              return (
                <TableRow>
                  <TableRowColumn>{cartItem.cheese.name}</TableRowColumn>
                  <TableRowColumn>{cartItem.quantity}</TableRowColumn>
                  <TableRowColumn>{'$'+cartItem.cheese.price}</TableRowColumn>
                  <TableRowColumn>{'$' + (cartItem.cheese.price * cartItem.quantity)}</TableRowColumn>
                  <TableRowColumn>
                    <FloatingActionButton
                      backgroundColor={"#FDD835"}
                      mini={true}
                      onClick={() => this.props.deltQuantity(cartItem.id, cartItem.quantity + 1)}>
                      <ContentAdd />
                    </FloatingActionButton>
                  </TableRowColumn>
                  <TableRowColumn>
                    <FloatingActionButton
                      backgroundColor={"#BF360C"}
                      mini={true}
                      onClick={() => this.props.deltQuantity(cartItem.id, cartItem.quantity - 1)}>
                      <ContentRemove />
                    </FloatingActionButton>
                  </TableRowColumn>
                </TableRow>
              )
            })
          }
          </TableBody>
        </Table>
        <RaisedButton
        onClick={()=>{
          this.props.purchaseCart(this.props.unpurchasedOrders)
          this.setState({open:true})
        }} 
        // issue with rendering twice
        // never have a setState in a render!
        label={(this.props.unpurchasedOrders.length<1)?`Your Cart is Empty`:`Purchase Cart $${cartTotal}`}
        fullWidth={true}
        disabled={this.props.unpurchasedOrders.length<1}/>
        <Dialog
          title="Thank you for shopping with us."
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Your order is processing and will be shipped soon.
        </Dialog>
      </div>
    )
    else return (<div></div>)
  }
}



function mapStateToProps(storeState) {
  return {
    unpurchasedOrders: storeState.purchases,
    // user: storeState.defaultUser // or session ID
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCart: (userId)=>{
      console.log('mounting')
      dispatch(GetUnorderedPurchasesUser(userId))
    },
    deltQuantity: (id,value)=>{
      if(value<1) dispatch(DeletePurchase(id))
      else dispatch(UpdatePurchase(id,{quantity: value}))
    },
    purchaseCart:(items)=>{
      items.forEach(item=>{
        dispatch(UpdatePurchase(
          item.id,
          {
            priceAtTimeOfSale: item.price,
            ordered: true,
            orderStatus: "processing"
          }
        ))
      })
    }
  }
}

const CartView = connect(mapStateToProps, mapDispatchToProps)(Cart)


export default CartView
