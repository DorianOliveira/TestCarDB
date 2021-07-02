using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;

namespace CarDB.Service.JsonHelper
{
    public class JsonHelper<T> : IJsonHelper<T> where T : JsonModel
    {
        private string _filePath;
        private List<T> _data;

        public JsonHelper(IConfiguration configuration)
        {
            _filePath = Path.Combine(Environment.CurrentDirectory, @configuration["FilePath"]);
        }

        public List<T> GetAll()
        {
            using StreamReader reader = new(_filePath);
            string json = reader.ReadToEnd();
            var items = JsonConvert.DeserializeObject<List<T>>(json);
            return items;
        }

        public void Delete(T item)
        {
            _data = GetAll();
            _data.RemoveAll(dataItem => dataItem.Id == item.Id);
            Save();
        }

        public void Insert(T item)
        {
            _data = GetAll();
            int lastId = GetLastId();
            
            item.Id = lastId + 1;
            _data.Add(item);
            Save();
        }

        public void Update(T item)
        {
            _data = GetAll();

            var itemData = _data.Find(dataItem => dataItem.Id == item.Id);

            if (itemData != null)
            {
                _data.Remove(itemData);
                _data.Add(item);
                Save();
            }
        }

        private void Save()
        {
            var serializedData = JsonConvert.SerializeObject(_data);
            System.IO.File.WriteAllText(_filePath, serializedData);
        }

        private int GetLastId() => _data.Max(item => item.Id);
    }
}