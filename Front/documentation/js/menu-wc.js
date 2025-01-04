'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">front documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AcceuilPageComponent.html" data-type="entity-link" >AcceuilPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AcceuilPageComponent-1.html" data-type="entity-link" >AcceuilPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AcceuilPageComponent-2.html" data-type="entity-link" >AcceuilPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AcceuilPageComponent-3.html" data-type="entity-link" >AcceuilPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AcceuilPageComponent-4.html" data-type="entity-link" >AcceuilPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AcceuilPageComponent-5.html" data-type="entity-link" >AcceuilPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AddAccountComponent.html" data-type="entity-link" >AddAccountComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AjoutResultBilanComponent.html" data-type="entity-link" >AjoutResultBilanComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AjoutSoinComponent.html" data-type="entity-link" >AjoutSoinComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BilansListeComponent.html" data-type="entity-link" >BilansListeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConsultationsComponent.html" data-type="entity-link" >ConsultationsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConsulterBilanComponent.html" data-type="entity-link" >ConsulterBilanComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConsulterDPIComponent.html" data-type="entity-link" >ConsulterDPIComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashBoardComponent.html" data-type="entity-link" >DashBoardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GenererGraphComponent.html" data-type="entity-link" >GenererGraphComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GestionPatientsComponent.html" data-type="entity-link" >GestionPatientsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderAccueilComponent.html" data-type="entity-link" >HeaderAccueilComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadingScreenComponent.html" data-type="entity-link" >LoadingScreenComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LogInPageComponent.html" data-type="entity-link" >LogInPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotificationPageComponent.html" data-type="entity-link" >NotificationPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotificationsComponent.html" data-type="entity-link" >NotificationsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OrdonnancesAccueilComponent.html" data-type="entity-link" >OrdonnancesAccueilComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/FetchModulesService.html" data-type="entity-link" >FetchModulesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostModulesService.html" data-type="entity-link" >PostModulesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserDataService.html" data-type="entity-link" >UserDataService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});