describe('DNS Shop - Advanced Tests', () => {
    beforeEach(() => {
      cy.visit('https://www.dns-shop.ru/');
      cy.get('body').then(($body) => {
        if ($body.find('.cookie-policy__close').length) {
          cy.get('.cookie-policy__close').click();
        }
      });
  
      cy.get('body').then(($body) => {
        if ($body.find('.base-modal__close').length) {
          cy.get('.base-modal__close').click();
        }
      });
    });
  
    it('scenari 1: poisk produkta i proverka resultatov', () => {
      const searchTerm = 'Видеокарта RTX 3060';
      cy.get('.header-search__field').type(searchTerm);
      cy.get('.header-search__submit').click();
      cy.get('.products-list__item').should('be.visible');
      cy.get('.products-list__item .product-card-title').each(($el) => {
        cy.wrap($el).invoke('text').then((text) => {
          expect(text.toLowerCase()).to.include(searchTerm.toLowerCase().split(' ')[1]);
        });
      });
    });
  
    it('scenar 2: dobavlenie producta v korzinu i proverka', () => {
      cy.visit('https://www.dns-shop.ru/product/0f8e54f6a764ed20/videokarta-palit-geforce-rtx-3060-dual-oc-ne30600019k9-190ad/');
      cy.get('.product-buy__button').click();
      cy.wait(1000)
  
      cy.get('.header-actions__item-count').should('not.have.text', '0');
  
      cy.get('.header-actions__item-icon').click();
  
      cy.get('.cart-items-list__item').should('be.visible');
      cy.get('.cart-items-list__item .cart-item-title').should('contain', 'GeForce RTX 3060');
    });
  
    it('scenar 3: proverka tovara v opredelennom gorode', () => {
      cy.visit('https://www.dns-shop.ru/product/0f8e54f6a764ed20/videokarta-palit-geforce-rtx-3060-dual-oc-ne30600019k9-190ad/');
      cy.get('.city-select-dropdown').click();
  
      cy.get('.city-select-list__item[data-city-id="154"]').click();
      cy.wait(1000)
      cy.get('.order-avail-wrap').should('be.visible');
      cy.get('.order-avail-wrap').should('contain', 'Ижевск');
    });
  
    it('scenari 4: filtr po diapozonu tsen', () => {  
      cy.visit('https://www.dns-shop.ru/catalog/17a89aab16404e77/videokarty/');
      cy.get('[data-role="price-range-from"]').clear().type('20000');
      cy.get('[data-role="price-range-to"]').clear().type('40000');
      cy.get('.ui-range-slider__range-apply').click();
  
      cy.wait(2000)
  
      cy.get('.products-list__item .product-card-price__current').each(($el) => {
        cy.wrap($el).invoke('text').then((text) => {
          const price = parseInt(text.replace(/\s/g, ''));
          expect(price).to.be.at.least(20000);
          expect(price).to.be.at.most(40000);
        });
      });
    });
    it('scenari 5: sortirobka tovara po tsene i proverka', () => {
      cy.visit('https://www.dns-shop.ru/catalog/17a89aab16404e77/videokarty/');
      cy.get('.catalog-header__sorting-item:first-child').click()
      cy.get('.dropdown-menu__item[data-sort="price-asc"]').click();
  
      cy.wait(2000);
  
      let prices = [];
      cy.get('.products-list__item .product-card-price__current')
          .each(($el) => {
              cy.wrap($el).invoke('text').then((text) => {
                  const price = parseInt(text.replace(/\s/g, ''));
                  prices.push(price);
              });
          })
          .then(() => {
              for (let i = 0; i < prices.length - 1; i++) {
                  expect(prices[i]).to.be.lte(prices[i + 1]);
              }
          });
    });
  });