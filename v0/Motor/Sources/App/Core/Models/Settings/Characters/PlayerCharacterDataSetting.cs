using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Characters;
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
        #region Constructors
        public PlayerCharacterDataSetting()
        {
            this.Hearts = new List<HeartHealthDataSetting>();
        }
        #endregion

        #region Properties
        /// <summary>
        /// Setting of the hearts of the player
        /// </summary>
        public List<HeartHealthDataSetting> Hearts { get; private set; }

        /// <summary>
        /// Overrides of the Health of the base character.
        /// From now (03/10/2020), we use only one heart
        /// </summary>
        public override HealthDataSetting Health 
        { 
            get => this.Hearts[0]; 
            set  
            {
                this.Hearts.Clear();

                this.Hearts.Add(new HeartHealthDataSetting()
                {
                    CurrentValue = value.CurrentValue,
                    IsMain = true,
                    MaxValue = value.MaxValue
                });
            }
        }


        /// <summary>
        /// Use it to define the setting of the synale of the player
        /// </summary>
        public SynaleDataSetting SynalePower { get; set; }
        #endregion
    }
}
