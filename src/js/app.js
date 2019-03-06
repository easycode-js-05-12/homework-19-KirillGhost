import { LoginComponent } from './components/login.component';
import { SignupComponent } from './components/signup.component';
import { HomeComponent } from './components/home.component';
import { NotFoundComponent } from './components/notfound.component';
import { UserComponent } from './components/user.component';
import { NewsComponent } from './components/news.component';
import { WinnersComponent } from './components/winners.component';
import { PaymentComponent } from './components/payment.component';
import { NavbarComponent } from './components/navbar.component';
import { ActiveRoute } from './core/active.route.service';
import { AuthGuard } from './guard/auth.guard';
import { PaymentGuard } from './guard/payment.guard';
import { container, header } from './view/uiElements.config';

const activeRoute = new ActiveRoute();
const authGuard = new AuthGuard();
const paymentGuard = new PaymentGuard();

const routes = {
    '/': {
        component: new HomeComponent(),
        guard: [authGuard]
    },
    '/login': {
        component: new LoginComponent()
    },
    '/signup': {
        component: new SignupComponent() 
    },
    '/users/:id': {
        component: new UserComponent(),
        guard: [authGuard]
    },
    '/payments': {
        component: new PaymentComponent(),
        guard: [authGuard, paymentGuard]
    },
    '/news': {
        component: new NewsComponent(),
        guard: [authGuard]
    },
    '/winners': {
        component: new WinnersComponent()
    },    
    '**': {
        component: new NotFoundComponent()
    }
};

const router = async () => {
    const request = activeRoute.parseRequestURL();
    const url = (request.resourse ? '/' + request.resourse : '/') + (request.id ? '/:id' : '');

    const component = routes[url] ? routes[url]['component'] : routes['**']['component']; 
    const guards = routes[url] ? routes[url]['guard'] : null;

    if (guards) {
        const guardState = guards.every((item) => item.canActivate());
        if (!guardState) return;
    }

    if (header) {
        const navbarComponent = new NavbarComponent();
        await navbarComponent.beforeRender();
        header.innerHTML = navbarComponent.render();
        navbarComponent.afterRender();
    }
    
    await component.beforeRender();
    if ((url !== '/news') && (url !== '/winners')) {
        container.innerHTML = component.render();
    } else {
        component.handle();
    }
    component.afterRender();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
