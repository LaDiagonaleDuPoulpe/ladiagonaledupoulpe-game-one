﻿using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings;
using ladiagonaledupoulpe.Sources.App.Shared.Services.Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers
{
    /// <summary>
    /// Initializes the main data of the game with a json file
    /// </summary>
    public class JsonGlobalDataDataInitializer : GlobalDataDataInitializer
    {
        #region Internal methods
        protected override GlobalSettings GetGlobalSettings()
        {
            using (File file = new Godot.File())
            {
                file.Open("res://Data/Global/GlobalSettings.json", File.ModeFlags.Read);
                string json = file.GetAsText();
                file.Close();

                return JsonConvert.DeserializeObject<GlobalSettings>(json);
            }
        }
        #endregion
    }
}
