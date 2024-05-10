/// <reference types="vite/client" />
declare namespace JSX {
    interface IntrinsicElements {
        // Extend with 'math' element
        math: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { xmlns?: string }, HTMLElement>;
        // Similarly, extend for other MathML elements if needed
        mfrac: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        mi: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        mo: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        mn: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        mrow: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
}