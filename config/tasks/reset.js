export const reset = () => {
    return app.plugins.deleteAsync(app.path.buildFolder) && app.plugins.deleteAsync(app.path.reportsFolder)
}