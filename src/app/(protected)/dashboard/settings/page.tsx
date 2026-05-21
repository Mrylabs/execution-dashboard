export default function SettingsPage() {
  return (
    <section className="max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-500">
          Manage app preferences and system information.
        </p>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-gray-500">Profile</h2>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
            M
          </div>

          <div>
            <p className="font-medium text-gray-900">Demo User</p>
            <p className="text-sm text-gray-500">Authenticated workspace</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-gray-500">System</h2>

        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Storage</span>
            <span className="font-medium text-gray-900">
              Supabase PostgreSQL
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Authentication</span>
            <span className="font-medium text-gray-900">Supabase Auth</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Data access</span>
            <span className="font-medium text-gray-900">
              Row Level Security
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Version</span>
            <span className="font-medium text-gray-900">v2</span>
          </div>
        </div>
      </section>
    </section>
  );
}