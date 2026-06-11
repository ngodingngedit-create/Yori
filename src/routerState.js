import { ref, nextTick } from 'vue';

export const currentPage = ref('home');
export const selectedProduct = ref(null);
export const selectedHighlight = ref(null);

export const navigateTo = (page, anchor = null, product = null, highlight = null) => {
  currentPage.value = page;
  if (product) selectedProduct.value = product;
  if (highlight) selectedHighlight.value = highlight;

  if (anchor) {
    nextTick(() => {
      setTimeout(() => {
        const element = document.querySelector(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
