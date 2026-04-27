export default function SettingsPage() {
  return (
    <section className="max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-500">
          Manage basic app preferences and local system information.
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
            <p className="text-sm text-gray-500">Local execution mode</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-gray-500">System</h2>

        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Storage</span>
            <span className="font-medium text-gray-900">Browser localStorage</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Authentication</span>
            <span className="font-medium text-gray-900">Demo protected routes</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Version</span>
            <span className="font-medium text-gray-900">v1</span>
          </div>
        </div>
      </section>
    </section>
  );
}