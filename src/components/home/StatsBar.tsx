const stats = [
  { value: '25+', label: 'Neighborhoods' },
  { value: '100+', label: 'Developments' },
  { value: '14', label: 'Expert Agents' },
  { value: '15+', label: 'Years of Excellence' },
];

export default function StatsBar() {
  return (
    <section className="relative z-10 -mt-10">
      <div className="site-container">
        <div className="grid gap-px overflow-hidden border border-[rgba(15,27,45,0.08)] bg-[rgba(15,27,45,0.08)] shadow-soft md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-8 text-center">
              <p className="font-serif text-4xl text-navy">{stat.value}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-editorial text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
