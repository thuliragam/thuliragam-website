export default function GoogleMap() {
  return (
    <div className="overflow-hidden rounded-3xl shadow-xl">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443.55850359619814!2d77.06010014810252!3d11.074833388572818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f92c1e4794cf%3A0x7c1f2149a7726750!2sThuliragam!5e1!3m2!1sen!2sin!4v1785317449895!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title="Thuliragam Location"
      />
    </div>
  );
}