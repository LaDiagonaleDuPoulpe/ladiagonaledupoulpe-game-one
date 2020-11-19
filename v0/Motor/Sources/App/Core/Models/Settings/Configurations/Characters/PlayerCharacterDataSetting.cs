using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Configurations.Characters
{
    /// <summary>
    /// Data setting of the player
    /// </summary>
    public class PlayerCharacterDataSetting : CharacterDataSetting
    {
        #region Properties
        /// <summary>
        /// Setting of the hearts of the player
        /// </summary>
        public List<HeartHealthDataSetting> Hearts { get; set; }

        /// <summary>
        /// Overrides of the Health of the base character.
        /// From now (03/10/2020), we use only one heart
        /// </summary>
        public override HealthDataSetting Health 
        { 
            get => this.Hearts[0]; 
            set => this.Hearts[0] = new HeartHealthDataSetting() 
                                    { 
                                        CurrentValue = value.CurrentValue, 
                                        IsMain = true, 
                                        MaxValue = value.MaxValue 
                                    }; 
        }
        #endregion
    }
}
