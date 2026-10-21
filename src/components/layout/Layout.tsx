import logo from '../../assets/figma/logo-header.svg'
import footerLogo from '../../assets/figma/12729-794-imgGrupo9.svg'
import instagram from '../../assets/figma/12729-794-imgInstagram.svg'
import facebook from '../../assets/figma/12729-794-imgFacebook.svg'
import linkedin from '../../assets/figma/12729-794-imgLinkedin.svg'
import heart from '../../assets/figma/heart.svg'
import user from '../../assets/figma/user.svg'
import cart from '../../assets/figma/cart.svg'
import group from '../../assets/figma/group.svg'
import shield from '../../assets/figma/shield.svg'
import truck from '../../assets/figma/truck.svg'
import credit from '../../assets/figma/credit.svg'
import search from '../../assets/figma/search.svg'
import crown from '../../assets/figma/crown.svg'
import './Layout.scss'

const navigation = ['Todas Categorias', 'Supermercado', 'Livros', 'Moda', 'Lançamentos', 'Ofertas do dia', 'Assinatura']
const footerGroups = [
  { title: 'Institucional', items: ['Sobre Nós', 'Movimento', 'Trabalhe conosco'] },
  { title: 'Ajuda', items: ['Suporte', 'Fale Conosco', 'Perguntas Frequentes'] },
  { title: 'Termos', items: ['Termos e Condições', 'Política de Privacidade', 'Troca e Devolução'] },
]

export function Header() {
  return <header className="site-header container">
    <ul className="benefits" aria-label="Benefícios"><li><img src={shield} alt="" width="20" height="20" /><span>Compra <strong>100% segura</strong></span></li><li><img src={truck} alt="" width="20" height="20" /><span><strong>Frete grátis</strong> acima de R$ 200</span></li><li><img src={credit} alt="" width="20" height="20" /><span><strong>Parcele</strong> suas compras</span></li></ul>
    <div className="header-main">
      <img src={logo} width="139" height="42" alt="Econverse" />
      <div className="search-field"><label className="sr-only" htmlFor="search">Buscar produtos — indisponível nesta prévia</label><input id="search" type="search" placeholder="O que você está buscando?" disabled /><img src={search} alt="" width="28" height="28" /></div>
      <div className="header-actions" aria-label="Ações indisponíveis nesta prévia"><img src={group} alt="Ícone adicional do cabeçalho" width="24" height="24" /><button disabled aria-label="Favoritos"><img src={heart} alt="" width="32" height="32" /></button><button disabled aria-label="Minha conta"><img src={user} alt="" width="32" height="32" /></button><button disabled aria-label="Carrinho"><img src={cart} alt="" width="32" height="32" /></button></div>
    </div>
    <nav aria-label="Categorias principais"><ul className="main-nav">{navigation.map(item => <li key={item}>{item === 'Assinatura' ? <img src={crown} alt="" width="20" height="20" /> : null}<span aria-disabled="true">{item}</span></li>)}</ul></nav>
  </header>
}

export function Footer() {
  return <footer>
    <section className="newsletter" aria-labelledby="newsletter-title"><div className="container newsletter-inner">
      <div><h2 id="newsletter-title">Inscreva-se na nossa newsletter</h2><p>Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.</p></div>
      <form aria-label="Newsletter — envio indisponível nesta prévia" onSubmit={event => event.preventDefault()}>
        <div className="newsletter-fields"><label><span className="sr-only">Nome</span><input placeholder="Digite seu nome" autoComplete="name" disabled /></label><label><span className="sr-only">E-mail</span><input type="email" placeholder="Digite seu e-mail" autoComplete="email" disabled /></label><button className="button" disabled>INSCREVER</button></div>
        <label className="newsletter-consent"><input type="checkbox" disabled /> Aceito os termos e condições</label>
      </form>
    </div></section>
    <div className="footer-main"><div className="container footer-inner">
      <div className="footer-brand"><img src={footerLogo} alt="Econverse" width="164" height="48" /><p>Projeto do teste técnico Front-End da Econverse.</p><ul className="socials" aria-label="Redes sociais — links pendentes">{[{ name: 'Instagram', src: instagram }, { name: 'Facebook', src: facebook }, { name: 'LinkedIn', src: linkedin }].map(social => <li key={social.name}><img src={social.src} alt={social.name} width="24" height="24" /></li>)}</ul></div>
      <div className="footer-groups">{footerGroups.map(group => <section key={group.title}><h2>{group.title}</h2><ul>{group.items.map(item => <li key={item}><span aria-disabled="true">{item}</span></li>)}</ul></section>)}</div>
    </div></div>
    <p className="footer-bottom">Projeto do teste técnico Front-End da Econverse.</p>
  </footer>
}
