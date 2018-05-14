import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header>
        <div style={{ maxWidth: '100%', background: 'black', textAlign: 'center'}} className="pure-menu pure-menu-horizontal">
            <ul className="pure-menu-list">
                <li className="pure-menu-item"><Link className="pure-menu-link" to="/">Създай линия</Link></li>
                <li className="pure-menu-item"><Link className="pure-menu-link" to="/delete-route">Премахни линия</Link></li>
                <li className="pure-menu-item"><Link className="pure-menu-link" to="/stops">Спирки</Link></li>
                <li className="pure-menu-item"><Link className="pure-menu-link" to="/towns">Добави Град</Link></li>
                <li className="pure-menu-item"><Link className="pure-menu-link" to="/reports">Съобщения</Link></li>
            </ul>
        </div>
    </header>
);

export default Header;
