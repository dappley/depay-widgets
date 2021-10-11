export default (style)=>{
  return(`

    .FooterLink {
      color: rgba(0,0,0,0.2);
      display: inline-block;
      font-size: 0.9rem;
      text-decoration: none;
    }

    .FooterLink:hover, .FooterLink:active {
      color: ${style.colors.primary};
    }
  `)
}
