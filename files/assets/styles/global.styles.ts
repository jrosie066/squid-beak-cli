import { create as createJss } from 'jss';
import { createGenerateClassName } from '@material-ui/core/styles';
import preset from 'jss-preset-default';

const jss = createJss(preset());
jss.options.createGenerateClassName = createGenerateClassName;

const styles = {
  '@global': {
    [`html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre,
      a, addr, acronym, address, big, cite, del, dfn, em, img, ins, kbd, q, s, samp, small, strike,
      strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, 
      caption, tbody, tfoot, thead,tr,th,ts
    `]: {
      margin: 0,
      padding: 0,
      outline: 0,
      border: 0,
      fontWeight: 'inherit',
      fontStyle: 'inherit',
      fontSize: '100%',
      verticalAlign: 'baseline',
    },
    '*, :after, :before': {
      boxSizing: 'border-box',
    },
  },
};

jss.createStyleSheet(styles).attach();
export { jss };

