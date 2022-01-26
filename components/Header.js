import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes'; //link is what allows to create a link that a user can navigate

      /*<Menu.Item
             name='browse'
             active={activeItem === 'browse'}
             onClick={this.handleItemClick}
           >
             Browse
           </Menu.Item>

link and menuitem clash with each other so we just replace the item parts with link
           */

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Link route="/">
        <a className="item">
          CrowdCoin
        </a>
      </Link>

           <Menu.Menu position='right'>
             <Link route="/">
               <a className="item">
                 CrowdCoin
               </a>
             </Link>

             <Link route="/campaigns/new">
               <a className="item">
                 +
               </a>
             </Link>
           </Menu.Menu>
         </Menu>
  )
}
