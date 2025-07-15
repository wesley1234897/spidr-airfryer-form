import { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    guess: '',
    pin: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'pin') {
      value = value.replace(/\D/g, '').slice(0, 16);
      value = value.match(/.{1,4}/g)?.join('-') || '';
    }

    if (name === 'phone') {
      // Remove all non-digits
      const digits = value.replace(/\D/g, '').slice(0, 10);
      // Format as (123) 456-7890
      if (digits.length > 6) {
        value = `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6,10)}`;
      } else if (digits.length > 3) {
        value = `(${digits.slice(0,3)}) ${digits.slice(3,6)}`;
      } else if (digits.length > 0) {
        value = `(${digits}`;
      } else {
        value = '';
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission
    setTimeout(() => {
      console.log('Form submitted:', form);
      setLoading(false);
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-[#252726] p-8 max-w-md w-full shadow-2xl border border-zinc-700"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-white tracking-wide">
          Spidr Air Fryer Registration
        </h1>

        {[
          { name: 'firstName', label: 'First name', autocomplete: 'given-name' },
          { name: 'lastName', label: 'Last name', autocomplete: 'family-name' },
          { name: 'phone', label: 'Phone number', autocomplete: 'tel' },
          { name: 'email', label: 'Email address', type: 'email', autocomplete: 'email' },
          { name: 'guess', label: "Guess the air fryer's cost ($)", autocomplete: 'off' },
          {
            name: 'pin',
            label: 'Very, very secret 16-digit Spidr PIN',
            placeholder: '####-####-####-####',
            autocomplete: 'off'
          },
        ].map(({ name, label, type = 'text', placeholder, autocomplete }) => (
          <div className="mb-4" key={name}>
            <label htmlFor={name} className="block mb-1 font-semibold">
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder || `Enter ${label.toLowerCase()}`}
              className="w-full px-4 py-3 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4492a2]]"
              required
              disabled={loading}
              autoComplete={autocomplete}
            />
          </div>
        ))}

        <button
          type="submit"
          className={`mt-6 w-full bg-[#4492a2] hover:bg-[#1E3D44] transition-all py-3 text-white hover:text-[#4492a2] font-bold text-lg ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <span>
              <svg className="inline mr-2 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
              </svg>
              Submitting...
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
}
