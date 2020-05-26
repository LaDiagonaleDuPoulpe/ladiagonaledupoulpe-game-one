using Godot;

namespace ddp.Plugins.Generators
{
    /// <summary>
    /// Setting proprties to configuration the generator
    /// </summary>
    public class GeneratorSetting
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

        /// <summary>
        /// Area to generate items
        /// </summary>
        public Vector2 Size { get; set; }

        /// <summary>
        /// Sets to true to allow sprite s to move 
        /// </summary>
        public bool IsAutoMoving { get; set; }

        /// <summary>
        /// True to go toleft, false to right
        /// </summary>
        public bool LeftDirection { get; set; }
        #endregion
    }
}