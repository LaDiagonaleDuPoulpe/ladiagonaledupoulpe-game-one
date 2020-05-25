namespace ddp.Plugins.Generators.CloudGenerator
{
    /// <summary>
    /// Setting proprties to configuration the cloud generator
    /// </summary>
    public class CloudGeneratorSetting
    {
        #region Properties
        /// <summary>
        /// The default number of clouds 
        /// </summary>
        /// <value></value>
        public int InitialNumber {get;set;}

        /// <summary>
        /// Z index of the clouds
        /// </summary>
        public int ZIndex { get; set; } = 0;

        /// <summary>
        /// Path to the resource to load
        /// </summary>
        public string ResourcePath { get; set; }
        #endregion
    }
}