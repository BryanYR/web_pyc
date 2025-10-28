export default defineNuxtPlugin(async () => {
  if (process.client) {
    const { i18nAddResources, i18nChangeLanguage } = await import('@wangeditor/editor')

    // Añade traducciones personalizadas
    i18nAddResources('es-ES', {
      bold: 'Negrita',
      italic: 'Cursiva',
      underline: 'Subrayado',
      insertTable: 'Insertar tabla',
      insertImage: 'Insertar imagen',
      uploadImage: 'Subir imagen',
      undo: 'Deshacer',
      redo: 'Rehacer',
      // ... añade las que necesites
    })

    // Cambia el idioma global
    i18nChangeLanguage('es-ES')
  }
})
