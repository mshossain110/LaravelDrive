import WidgetCount from './WidgetCount';

export default function Dashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Overview of your drive storage</p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <WidgetCount icon="perm_media">
                    <span className="block text-xs font-medium uppercase tracking-wide text-gray-500">Total Files</span>
                    <span className="block text-xl font-bold text-gray-900">3,796</span>
                </WidgetCount>

                <WidgetCount icon="folder_open">
                    <span className="block text-xs font-medium uppercase tracking-wide text-gray-500">Total Folders</span>
                    <span className="block text-xl font-bold text-gray-900">56</span>
                </WidgetCount>

                <WidgetCount icon="people">
                    <span className="block text-xs font-medium uppercase tracking-wide text-gray-500">Total Users</span>
                    <span className="block text-xl font-bold text-gray-900">23</span>
                </WidgetCount>

                <WidgetCount icon="memory">
                    <span className="block text-xs font-medium uppercase tracking-wide text-gray-500">Total Space Used</span>
                    <span className="block text-xl font-bold text-gray-900">650.3 MB</span>
                </WidgetCount>
            </div>
        </div>
    );
}
