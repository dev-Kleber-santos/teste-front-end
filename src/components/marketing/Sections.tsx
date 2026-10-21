import hero from '../../assets/figma/1-1640-imgRectangle250.png'
import technology from '../../assets/figma/12729-31-imgImage.png'
import supermarket from '../../assets/figma/12729-31-imgSupermercados1.png'
import drinks from '../../assets/figma/12729-31-imgWhiskey.png'
import tools from '../../assets/figma/12729-31-imgFerramentas1.png'
import health from '../../assets/figma/12729-31-imgCuidadosDeSaude1.png'
import sports from '../../assets/figma/12729-31-imgCorrida1.png'
import fashion from '../../assets/figma/12729-31-imgModa1.png'
import partner from '../../assets/figma/12729-947-imgImage46.png'
import brand from '../../assets/figma/12729-528-imgLogo.svg'
import './Sections.scss'

const categories = [{ name: 'Tecnologia', image: technology }, { name: 'Supermercado', image: supermarket }, { name: 'Bebidas', image: drinks }, { name: 'Ferramentas', image: tools }, { name: 'Saúde', image: health }, { name: 'Esportes e Fitness', image: sports }, { name: 'Moda', image: fashion }]

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title"><img className="hero-image" src={hero} alt="" fetchPriority="high" /><div className="hero-shade" /><div className="container hero-content"><h1 id="hero-title">Venha conhecer nossas promoções</h1><p><strong>50% Off</strong> nos produtos</p><a className="button" href="#vitrine-1">Ver produto</a></div></section>
}

export function Categories() {
  return <section className="categories container" aria-label="Compre por categoria"><ul>{categories.map(category => <li key={category.name}><div className="category-image"><img src={category.image} alt="" width={category.name === 'Moda' ? 63 : 61} height={category.name === 'Moda' ? 63 : 61} /></div><span aria-disabled="true">{category.name}</span></li>)}</ul></section>
}

export function Partners({ provisional = false }: { provisional?: boolean }) {
  return <section className="partners container" aria-label="Parceiros">{provisional ? <p className="partners-note">Prévia — imagem reutilizada; asset deste conjunto aguarda confirmação.</p> : null}{[0, 1].map(index => <article className="partner" key={index}><img src={partner} alt="" loading="lazy" /><div className="partner-shade" /><div className="partner-content"><h2>Parceiros</h2><p>Conheça os parceiros da Econverse.</p><button className="button" type="button" disabled>CONFIRA</button></div></article>)}</section>
}

export function Brands() {
  return <section className="brands container" aria-labelledby="brands-title"><h2 id="brands-title">Navegue por marcas</h2><ul>{[0, 1, 2, 3, 4].map(index => <li key={index}><img src={brand} alt="Econverse" width="117" height="35" loading="lazy" /></li>)}</ul></section>
}
