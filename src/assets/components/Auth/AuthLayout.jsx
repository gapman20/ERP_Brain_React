import AuthHeader from './AuthHeader';

export default function AuthLayout({ children, quote }) {
  return (
    <section className="auth-container">
      <AuthHeader quote={quote} />
      <div className="auth-right">
        {children}
      </div>
    </section>
  );
}
