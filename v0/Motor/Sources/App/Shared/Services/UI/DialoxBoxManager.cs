using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Services
{
    public class DialoxBoxManager : Node
    {
        #region Fields
        private static Lazy<DialoxBoxManager> __instance = new Lazy<DialoxBoxManager>(() => new DialoxBoxManager());
        #endregion

        #region Constructors
        private DialoxBoxManager() 
        {
            
        }
        #endregion

        #region Public methods
        /// <summary>
        /// Preloads data about the dialog box
        /// </summary>
        public void Preload()
        {
            Resource resource = ResourceLoader.Load("res://Sources/App/Shared/Assets/Animations/Characters/Speaking/player3.tres");
            SpriteFrames spriteFrames = resource as SpriteFrames;

            
        }
        #endregion

        #region Properties
        /// <summary>
        /// Single instance of the class
        /// </summary>
        public static DialoxBoxManager Instance { get => __instance.Value; }
        #endregion
    }
}
