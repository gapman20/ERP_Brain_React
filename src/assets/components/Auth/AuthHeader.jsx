import BrainLogo from '../../img/circuito.ico';
import accountingBg from '../../img/accounting_bg.png';

export default function AuthHeader({ quote }) {
  return (
    <div
      className="auth-left"
      style={{
        backgroundImage: `url(${accountingBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden'
      }}
    >
      <div style={{ 
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
        background: 'linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.45))',
        zIndex: 1
      }}></div>

      <div style={{ 
        position: 'relative', zIndex: 10, height: '100%', 
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '4rem'
      }}>
        <div>
          <img 
            src={BrainLogo} 
            alt="Brain ERP" 
            style={{ height: '60px', filter: 'brightness(0) invert(1)' }} 
          />
          <span style={{ 
            color: 'white', fontSize: '1.5rem', fontWeight: 'bold', 
            marginLeft: '1rem', verticalAlign: 'middle', letterSpacing: '1px' 
          }}>BRAIN ERP</span>
        </div>

        <div style={{ maxWidth: '480px' }}>
          <h2 style={{ 
            fontSize: '2.8rem', fontWeight: '800', color: 'white', 
            marginBottom: '2rem', lineHeight: '1.1', textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            "{quote}"
          </h2>
          <div style={{ borderLeft: '4px solid #4f46e5', paddingLeft: '1.5rem' }}>
            <p style={{ fontWeight: '600', color: 'white', margin: 0, fontSize: '1.1rem' }}>Equipo Brain ERP</p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>Gestión Empresarial de Próxima Generación</p>
          </div>
        </div>
      </div>
    </div>
  );
}
