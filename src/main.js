import { getProducts } from './api/products';
import Product from './components/product';

(async (root) => {

  const skeleton = root.querySelector('.skeleton');
  const main = root.querySelector('main');

  const products = await getProducts();

  const cards = products.map((item) => {
    const product = Product;
    product.props.id = item.id;
    product.props.title = item.title;
    product.props.description = item.description;
    product.props.image = item.image;

    const card = product.render();
    main.appendChild(card);
    return card;
  });


  skeleton.setAttribute('hidden', 'hiddle');

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
   */
   const options = {
    rootMarging : '0px 0px 0px 0px'
  };

  const callback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Actualy load image
        const image = entry.target
        image.src = image.dataset.src;
        image.onload = () => {
          image.parentNode.querySelector('.placeholder').classList.add('fade');
        }
        io.unobserve(entry.target);
      }
    })
  }

  const io = new IntersectionObserver(callback, options);

  cards.forEach(card => {
    const image = card.querySelector('img');
    io.observe(image);
  });

})(document.querySelector('#app'));